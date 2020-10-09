import api from '../../api/images';
import router from '../../router';

const state = {
  images: [],
  selectedImage: null,
  imagesError: null,
};

const getters = {
  images: ({ images }) => images,
  selectedImage: ({ selectedImage }) => selectedImage,
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
  async uploadImages({ commit }, formData) {
    try {
      await api.uploadImages(formData);
      commit('setImagesError', null);
      router.push('/images');
    } catch (err) {
      commit('setImagesError', err);
    }
  },
  async deleteImage({ commit }, filename) {
    try {
      await api.deleteImage(filename);
      commit('setImagesError', null);
      await actions.fetchImages();
    } catch (err) {
      commit('setImagesError', err);
    }
  },
  selectImage({ commit }, image) {
    commit('setSelectedImage', image);
  },
  async fetchImage({ commit }, filename) {
    try {
      const image = await api.fetchImage(filename);
      commit('setSelectedImage', image);      
    } catch (err) {
      commit('setImagesError', err);
    }
  }
};

const mutations = {
  setImages(state, images) {
    state.images = images
  },
  setImagesError(state, error) {
    state.imagesError = error
  },
  setSelectedImage(state, image) {
    state.selectedImage = image;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
