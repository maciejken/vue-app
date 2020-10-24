import api from '../../api/users';
import router from '../../router';

export const state = {
  error: null,
};

export const actions = {
  async createUser({ commit, rootState }, user) {
    try {
      const { apiUrl } = rootState.settings;
      await api.createUser({ apiUrl, user });
      commit('SET_USER_ERROR', null);
      router.push('/login');
    } catch (err) {
      commit('SET_USER_ERROR', err);
    }
  },
};

export const mutations = {
  SET_USER_ERROR(state, error) {
    state.error = error;
  },
};

export const getters = {

};

export default {
  state,
  actions,
  mutations,
  getters,
}
