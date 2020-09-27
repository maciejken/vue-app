import jwtDecode from 'jwt-decode';
import api from '../../api/auth';
import router from '../../router';

const state = {
  accessToken: null,
  accessError: null,
};

const getters = {
  isLoggedIn({ accessToken }) {
    return !!accessToken;
  },
  accessToken({ accessToken }) {
    return accessToken;
  },
  accessError({ accessError }) {
    return accessError;
  }
};

const actions = {
  async login({ commit }, basicAuth) {
    try {
      const res = await api.fetchAccessToken(basicAuth);
      commit('setAccessToken', res.data);
      localStorage.accessToken = res.data;
      router.push('/');
    } catch (err) {
      if (err.message.endsWith('status code 403')) {
        commit('setAccessError', new Error('Odmowa dostępu'));
      } else {
        commit('setAccessError', new Error('Nieznany błąd'));
      }
    }
  },
  updateAccessToken({ commit }, token) {
    if (token) {
      jwtDecode(token);
      commit('setAccessToken', token);
      router.push('/');
    }
  },
  logout({ commit }) {
    commit('setAccessToken', null);
    delete localStorage.accessToken;
    router.push('/login');
  },
  clearAccessError({ commit }) {
    commit('setAccessError', null);
  },
};

const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token;
  },
  setAccessError(state, error) {
    state.accessError = error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
