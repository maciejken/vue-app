import api from '../../api/auth';
import router from '../../router';
import cookie from '../../utils/cookie';

const state = {
  expires: null,
  seconds: null,
  timer: null,
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
    cookie.clearAuth();
    clearInterval(state.timer);
    commit('SET_AUTH_SECONDS', null);
    commit('SET_AUTH_TIMER', null);
    router.push('/login');
  },
  clearAccessError({ commit }) {
    commit('SET_AUTH_ERROR', null);
  },
  authorize({ commit, dispatch, state }) {
    if (state.timer) {
      clearInterval(state.timer);
    }
    const expires = cookie.getAuthExpiration();
    if (expires) {
      commit('SET_AUTH_EXPIRES', expires);
      let seconds = parseInt((state.expires - Date.now())/1000);
      commit('SET_AUTH_SECONDS', seconds);
      const timer = setInterval(() => {
        seconds = parseInt((state.expires - Date.now())/1000);
        if (seconds <= 0) {
          clearInterval(state.timer);
          dispatch('logout');
        } else {
          commit('SET_AUTH_SECONDS', seconds);
        }
        return seconds;
      }, 1000);
      commit('SET_AUTH_TIMER', timer);      
    } else {
      commit('SET_AUTH_EXPIRES', null);
      commit('SET_AUTH_SECONDS', null);
      commit('SET_AUTH_TIMER', null);
    }
    return expires;
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
  SET_AUTH_EXPIRES(state, expires) {
    state.expires = expires;
  },
  SET_AUTH_TIMER(state, timer) {
    state.timer = timer;
  },
  SET_AUTH_SECONDS(state, seconds) {
    state.seconds = seconds;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
