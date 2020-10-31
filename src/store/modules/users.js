import api from '../../api/users';
import router from '../../router';

export const state = {
  error: null,
  userId: null,
  groupId: null,
  userGroups: [],
  users: [],
  groups: [],
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
  updateUserId({ commit }, userId) {
    commit('SET_USER_ID', userId);
  },
  updateUserGroups({ commit }, groups) {
    commit('SET_USER_GROUPS', groups);
  },
};

export const mutations = {
  SET_USER_ERROR(state, error) {
    state.error = error;
  },
  SET_USER_ID(state, userId) {
    state.userId = userId;
  },
  SET_USER_GROUPS(state, groups) {
    state.userGroups = groups;
  },
};

export const getters = {
  userGroups: ({ userGroups }) => userGroups,
  userId: ({ userId }) => userId,
};

export default {
  state,
  actions,
  mutations,
  getters,
}
