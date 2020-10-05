import api from '../../api/auth';
import router from '../../router';

const state = {
  authorized: false,
  accessError: null,
};

const getters = {
  isAuthorized({ authorized }) {
    return authorized;
  },
  accessError({ accessError }) {
    return accessError;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    try {
      await api.authenticate({ username, password });
      commit('setAuthorized', true);
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
    commit('setAuthorized', false);
    document.cookie = '';
    router.push('/login');
  },
  clearAccessError({ commit }) {
    commit('setAccessError', null);
  },
};

const mutations = {
  setAuthorized(state, isAuthorized) {
    state.authorized = isAuthorized;
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
