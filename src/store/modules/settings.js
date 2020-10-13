const state = {
  keyMap: 'dvorakToPuk',
  colorTheme: 'light',
};

const getters = {
  selectedKeyMap: ({ keyMap }) => keyMap,
  selectedColorTheme: ({ theme }) => theme,
};

const actions = {
  selectKeyMap({ commit }, keyMap) {
    commit('SET_KEY_MAP', keyMap);
  },
  selectColorTheme({ commit }, theme) {
    commit('SET_COLOR_THEME', theme);
  }
};

const mutations = {
  SET_KEY_MAP(state, keyMap) {
    state.keyMap = keyMap;
  },
  SET_COLOR_THEME(state, theme) {
    state.colorTheme = theme;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
