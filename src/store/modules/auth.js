import authGateway from '../../gateways/auth-gateway';
import router from '../../router';

const EmailRegex = /^[a-zA-Z0-9_.+-]{3,20}@[a-zA-Z0-9-]{3,10}\.[a-zA-Z0-9-.]{2,10}$/;
const PasswordRegex = /^[A-Za-z0-9]{8,24}$/;

const state = {
  token: null,
  username: null,
  password: null,
  accessDenied: false,
};

const getters = {
  isLoggedIn({ token }) {
    return !!token;
  },
  email({ username }) {
    return username;
  },
  password({ password }) {
    return password;
  },
  isAccessDenied({ accessDenied }) {
    return accessDenied;
  },
  isEmailValid({ username }) {
    return username && EmailRegex.test(username);
  },
  isPasswordValid({ password }) {
    return password && PasswordRegex.test(password);
  }
};

const actions = {
  updateEmail({ commit }, evt) {
    commit('setAccessDenied', false);
    commit('setUsername', evt.target.value);
  },
  updatePassword({ commit }, evt) {
    commit('setAccessDenied', false);
    commit('setPassword', evt.target.value);
  },
  login({ commit }) {
    const { username, password } = state;
    const basicAuthBase64 = window.btoa(`${username}:${password}`);
    authGateway.fetchAuthToken(basicAuthBase64).then(token => {
      commit('setToken', token);
      commit('setUsername', null);
      commit('setPassword', null);
      commit('setAccessDenied', false);
      router.push('/');
    })
    .catch(err => {
      if (err.message.endsWith('status code 403')) {
        commit('setAccessDenied', true);       
      }
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
  setUsername(state, email) {
    state.username = email;
  },
  setPassword(state, password) {
    state.password = password;
  },
  setAccessDenied(state, accessDenied) {
    state.accessDenied = accessDenied;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
