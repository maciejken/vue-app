import authGateway from '../../gateways/auth-gateway';
import { router } from '../../main';

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

const state = {
  token: null,
  username: null,
  password: null,
};

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  },
  email(state) {
    return state.username;
  },
  password(state) {
    return state.password;
  }
};

const actions = {
  updateEmail({ commit }, evt) {
    commit('setUsername', evt.target.value);
  },
  updatePassword({ commit }, evt) {
    commit('setPassword', evt.target.value);
  },
  login({ commit }) {
    const { username, password } = state;
    const basicAuthBase64 = window.btoa(`${username}:${password}`);
    console.log(basicAuthBase64);
    authGateway.fetchAuthToken(basicAuthBase64)
    .then(token => {
      console.log(token);
      commit('setToken', token);
      commit('setUsername', null);
      commit('setPassword', null);
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
  setUsername(state, email) {
    state.username = email;
  },
  setPassword(state, password) {
    state.password = password;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
