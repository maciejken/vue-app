import authGateway from '../../gateways/auth-gateway';
import router from '../../router';

const state = {
  token: null,
  error: null,
};

const getters = {
  isLoggedIn({ token }) {
    return !!token;
  },
  authError({ error }) {
    return error;
  }
};

const actions = {
  login({ commit }, basicCredentials) {
    const basicCredentialsBase64 = window.btoa(basicCredentials);
    authGateway.fetchAuthToken(basicCredentialsBase64).then(token => {
      commit('setToken', token);
      commit('setError', null);
      router.push('/');
    })
    .catch(err => {
      if (err.message.endsWith('status code 403')) {
        commit('setError', new Error('Brak dostępu (błąd 403)'));
      }
    });
  },
  logout({ commit }) {
    commit('setToken', null);
    router.push('/login');
  },
  clearAuthError({ commit }) {
    commit('setError', null);
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setError(state, error) {
    state.error = error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
