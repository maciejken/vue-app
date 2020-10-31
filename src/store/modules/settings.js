const state = {
  apiUrl: process.env.VUE_APP_API_URL,
  keyMap: 'dvorakToPuk',
  colorTheme: 'light',
  editMode: false,
  sidebarVisible: false,
};

const getters = {
  pathToUploads: ({ apiUrl }) => `${apiUrl}/uploads`,
  selectedKeyMap: ({ keyMap }) => keyMap,
  selectedColorTheme: ({ theme }) => theme,
  editSettingsMode: ({ editMode }) => editMode,
  sidebarVisible: ({ sidebarVisible }) => sidebarVisible,
};

const actions = {
  selectKeymap({ commit }, evt) {
    commit('SET_KEY_MAP', evt.target.id);
    commit('SET_EDIT_MODE', false);
  },
  selectColorTheme({ commit }, theme) {
    commit('SET_COLOR_THEME', theme);
  },
  showSettings({ commit }) {
    commit('SET_EDIT_MODE', true);
  },
  hideSettings({ commit }) {
    commit('SET_EDIT_MODE', false);
  },
  showSidebar({ commit }) {
    commit('SET_SIDEBAR_VISIBLE', true);
  },
  hideSidebar({ commit }) {
    commit('SET_SIDEBAR_VISIBLE', false);
  },
};

const mutations = {
  SET_KEY_MAP(state, keyMap) {
    state.keyMap = keyMap;
  },
  SET_COLOR_THEME(state, theme) {
    state.colorTheme = theme;
  },
  SET_EDIT_MODE(state, visible) {
    state.editMode = visible;
  },
  SET_SIDEBAR_VISIBLE(state, visible) {
    state.sidebarVisible = visible;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
