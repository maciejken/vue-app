import api from '../../api/auth';
import router from '../../router';
import { getAuthExpired } from '../../utils/cookie';

const state = {
  seconds: null,
  timer: null,
  timeout: null,
  error: null,
};

const getters = {
  isAuthorized: ({ seconds }) => seconds > 0,
  secondsLeft: ({ seconds }) => seconds,
  accessError: ({ error }) => error,
  timeLeft({ seconds }) {
    let time;
    if (seconds) {
      const secs = String(seconds % 60);
      const mins = (seconds - secs)/60;
      const zeroPaddedSecs = secs.padStart(2, '0');
      time = `${mins}:${zeroPaddedSecs}`;
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
        commit('SET_AUTH_ERROR', new Error('Odmowa dostępu'));
      } else {
        commit('SET_AUTH_ERROR', new Error('Nieznany błąd'));
      }
    }
  },
  logout({ commit, state }) {
    document.cookie = getAuthExpired();
    commit('SET_AUTH_SECONDS', null);
    clearInterval(state.authTimer);
    commit('SET_AUTH_TIMER', null);
    router.push('/login');
  },
  clearAccessError({ commit }) {
    commit('SET_AUTH_ERROR', null);
  },
  authorize(
      { commit, dispatch, state },
      seconds = parseInt(process.env.VUE_APP_AUTH_VALIDITY_SECONDS)
    ) {
    if (state.timer) {
      clearInterval(state.timer);
      clearTimeout(state.timeout);
    }
    commit('SET_AUTH_SECONDS', seconds);
    const timer = setInterval(() => commit('SET_AUTH_SECONDS', state.seconds - 1), 1000);
    commit('SET_AUTH_TIMER', timer);
    const timeout = setTimeout(() => dispatch('logout'), seconds * 1000);
    commit('SET_AUTH_TIMEOUT', timeout);
  },
  async reauth({ commit, dispatch }) {
    try {
      await api.authenticate();
      dispatch('authorize'); 
    } catch (err) {
      if (err.message) {
        commit('SET_AUTH_ERROR', new Error('Odmowa dostępu'));
      } else {
        commit('SET_AUTH_ERROR', new Error('Nieznany błąd'));
      }
    }
  },
};

const mutations = {
  SET_AUTH_ERROR(state, error) {
    state.error = error;
  },
  SET_AUTH_SECONDS(state, seconds) {
    state.seconds = seconds;
  },
  SET_AUTH_TIMER(state, timer) {
    state.timer = timer;
  },
  SET_AUTH_TIMEOUT(state, timeout) {
    state.timeout = timeout;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
