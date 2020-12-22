import api from '../../api/users';
import router from '../../router';
import cookie from '../../utils/cookie';

export const state = {
  error: null,
  userId: null,
  groupId: null,
  userGroupIds: [],
  userGroups: [],
};

export const actions = {
  async createUser({ commit, rootState }, user) {
    try {
      const { apiUrl } = rootState.settings;
      await api.createUser({ apiUrl, user });
      commit('setUserError', null);
      router.push('/login');
    } catch (err) {
      commit('setUserError', err);
    }
  },
  updateUserId({ commit }, userId) {
    commit('setUserId', userId);
  },
  selectGroupId({ commit }, groupId) {
    commit('setSelectedGroupId', groupId);
  },
  updateUserData({ commit }) {
    const { userId, groups } = cookie.getUserData();
    if (userId && groups) {
      commit('setUserId', userId);
      commit('setUserGroupIds', groups)
      if (groups.length === 1) {
        commit('setGroupId', groups[0]);
      }
    }
  },
  async fetchUserGroups({ commit, rootState }) {
    const { apiUrl } = rootState.settings;
    const { userId } = rootState.users;
    try {
      const groups = await api.getUserGroups({ apiUrl, userId });
      commit('setUserGroups', groups);
    } catch (err) {
      commit('setUserError', err);
    }
  },
};

export const mutations = {
  setUserError(state, error) {
    state.error = error;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setGroupId(state, groupId) {
    state.groupId = groupId;
  },
  setUserGroupIds(state, ids) {
    state.userGroupIds = ids;
  },
  setUserGroups(state, groups) {
    state.userGroups = groups;
  },
};

export const getters = {
  userGroupIds: ({ userGroupIds }) => userGroupIds,
  userGroups: ({ userGroups }) => userGroups,
  selectedGroupId: ({ groupId }) => groupId,
  userId: ({ userId }) => userId,
};

export default {
  state,
  actions,
  mutations,
  getters,
}
