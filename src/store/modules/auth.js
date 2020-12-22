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
  async login({ commit, dispatch, rootState }, auth) {
    try {
      const { apiUrl } = rootState.settings;
      await api.authenticate({ apiUrl, auth });
      dispatch('authorize');
      router.push('/');
    } catch (err) {
      if (err.message) {
        commit('setAuthError', new Error('Odmowa dostępu'));
      } else {
        commit('setAuthError', new Error('Nieznany błąd'));
      }
    }
  },
  logout({ commit, dispatch, state }) {
    cookie.clearAuth();
    clearInterval(state.timer);
    commit('setAuthSeconds', null);
    commit('setAuthTimer', null);
    dispatch('updateUserId', null);
    dispatch('hideSidebar');
    dispatch('hideModals');
    router.push('/login');
  },
  clearAccessError({ commit }) {
    commit('setAuthError', null);
  },
  authorize({ commit, dispatch, state }) {
    if (state.timer) {
      clearInterval(state.timer);
    }
    const expires = cookie.getAuthExpiration();
    if (expires) {
      commit('setAuthExpires', expires);
      let seconds = parseInt((state.expires - Date.now())/1000);
      commit('setAuthSeconds', seconds);
      const timer = setInterval(() => {
        seconds = parseInt((state.expires - Date.now())/1000);
        if (seconds <= 0) {
          clearInterval(state.timer);
          dispatch('logout');
        } else {
          commit('setAuthSeconds', seconds);
        }
        return seconds;
      }, 1000);
      commit('setAuthTimer', timer);
      dispatch('updateUserData');
    } else {
      commit('setAuthExpires', null);
      commit('setAuthSeconds', null);
      commit('setAuthTimer', null);
    }
    return expires;
  },
  async reauth({ commit, dispatch, rootState }) {
    try {
      const { apiUrl } = rootState.settings;
      await api.authenticate({ apiUrl });
      dispatch('authorize'); 
    } catch (err) {
      if (err.message) {
        commit('setAuthError', new Error('Odmowa dostępu'));
      } else {
        commit('setAuthError', new Error('Nieznany błąd'));
      }
    }
  },
};

const mutations = {
  setAuthError(state, error) {
    state.error = error;
  },
  setAuthExpires(state, expires) {
    state.expires = expires;
  },
  setAuthTimer(state, timer) {
    state.timer = timer;
  },
  setAuthSeconds(state, seconds) {
    state.seconds = seconds;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
