import api from '../../api/auth';
import router from '../../router';
import { getAuthExpired } from '../../cookie';

const state = {
  secondsLeft: null,
  authTimer: null,
  authTimeout: null,
  accessError: null,
};

const getters = {
  isAuthorized({ secondsLeft }) {
    return secondsLeft > 0;
  },
  hourglass({ secondsLeft }) {
    let phase;
    if (secondsLeft > 720) {
      phase = 'start';
    } else {
      phase = secondsLeft > 180 ? 'half' : 'end';
    }
    return phase;
  },
  accessError({ accessError }) {
    return accessError;
  },
  timeLeft({ secondsLeft }) {
    let time;
    if (secondsLeft) {
      const seconds = String(secondsLeft % 60);
      const minutes = (secondsLeft - seconds)/60;
      const zeroPaddedSeconds = seconds.padStart(2, '0');
      time = `${minutes}:${zeroPaddedSeconds}`;
    } else {
      time = '0:00';
    }
    return time;
  },
};

const actions = {
  async login({ commit, dispatch }, { username, password }) {
    try {
      await api.authenticate({ username, password });
      dispatch('authorize');
      router.push('/');
    } catch (err) {
      if (err.message) {
        commit('setAccessError', new Error('Odmowa dostępu'));
      } else {
        commit('setAccessError', new Error('Nieznany błąd'));
      }
    }
  },
  logout({ commit }) {
    document.cookie = getAuthExpired();
    commit('setSecondsLeft', null);
    clearInterval(state.authTimer);
    commit('setAuthTimer', null);
    router.push('/login');
  },
  clearAccessError({ commit }) {
    commit('setAccessError', null);
  },
  authorize({ commit, dispatch, state }, seconds) {
    if (state.authTimer) {
      clearInterval(state.authTimer);
      clearTimeout(state.authTimeout);
    }
    const authSeconds = seconds || parseInt(process.env.VUE_APP_AUTH_VALIDITY_SECONDS);
    commit('setSecondsLeft', authSeconds);
    const timer = setInterval(() => commit('setSecondsLeft', state.secondsLeft - 1), 1000);
    commit('setAuthTimer', timer);
    const timeout = setTimeout(() => dispatch('logout'), authSeconds * 1000);
    commit('setAuthTimeout', timeout);
  },
  async reauth({ commit, dispatch }) {
    try {
      await api.authenticate();
      dispatch('authorize'); 
    } catch (err) {
      if (err.message) {
        commit('setAccessError', new Error('Odmowa dostępu'));
      } else {
        commit('setAccessError', new Error('Nieznany błąd'));
      }
    }
  },
};

const mutations = {
  setAccessError(state, error) {
    state.accessError = error;
  },
  setSecondsLeft(state, secondsLeft) {
    state.secondsLeft = secondsLeft;
  },
  setAuthTimer(state, timer) {
    state.authTimer = timer;
  },
  setAuthTimeout(state, timeout) {
    state.authTimeout = timeout;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
