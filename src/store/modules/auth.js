import authGateway from '../../gateways/auth-gateway';
import router from '../../router';

const state = {
  token: null,
};

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  },
};

const actions = {
  login({ commit }, basicCredentials) {
    const basicCredentialsBase64 = window.btoa(basicCredentials);
    authGateway.fetchAuthToken(basicCredentialsBase64).then(token => {
      console.log(token);
      commit('setToken', token);
      router.push('/');
    })
    .catch(err => {
      console.log(err);
    });
  },
  logout({ commit }) {
    commit('setToken', null);
    router.push('/login');
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
