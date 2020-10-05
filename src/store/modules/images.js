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
  async fetchImages({ commit }) {
    try {
      const images = await api.fetchImages();
      commit('setImages', images);
      commit('setImagesError', null);
    } catch (err) {
      commit('setImagesError', err);
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
