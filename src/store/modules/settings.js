const state = {
  keyMap: 'dvorakToPuk',
  colorTheme: 'light',
  edit: false,
};

const getters = {
  selectedKeyMap: ({ keyMap }) => keyMap,
  selectedColorTheme: ({ theme }) => theme,
  showSettings: ({ edit }) => edit,
};

const actions = {
  selectKeymap({ commit }, evt) {
    commit('SET_KEY_MAP', evt.target.id);
    commit('SET_EDIT', false);
  },
  selectColorTheme({ commit }, theme) {
    commit('SET_COLOR_THEME', theme);
  },
  showSettings({ commit }) {
    commit('SET_EDIT', true);
  },
  hideSettings({ commit }) {
    commit('SET_EDIT', false);
  },
};

const mutations = {
  SET_KEY_MAP(state, keyMap) {
    state.keyMap = keyMap;
  },
  SET_COLOR_THEME(state, theme) {
    state.colorTheme = theme;
  },
  SET_EDIT(state, visible) {
    state.edit = visible;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
