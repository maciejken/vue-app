import api from '../../api/images';

const state = {
  images: [],
  imagesError: null,
};

const getters = {
  images: ({ images }) => images,
  imagesError: ({ imagesError }) => imagesError,
};

const actions = {
  async fetchImages({ commit, getters }) {
    try {
      const images = await api.fetchImages({ accessToken: getters.accessToken });
      commit('setImages', images.data)
      commit('setImagesError', null)
    } catch (err) {
      commit('setImagesError', err)
    }
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images
  },
  setImagesError(state, error) {
    state.imagesError = error
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
