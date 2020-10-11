import api from '../../api/images';
import router from '../../router';

const state = {
  images: [],
  pathToUploads: process.env.VUE_APP_PATH_TO_UPLOADS,
  selectedImage: {
    filename: null,
    userId: null,
    caption: null,
    location: null,
    locationDateTime: null,
    description: null,
    createdAt: null,
    updatedAt: null,
  },
  error: null,
  editModeEnabled: false,
};

const getters = {
  uploadedImages: ({ images }) => images,
  pathToUploads: ({ pathToUploads }) => pathToUploads,
  selectedImage: ({ selectedImage }) => selectedImage,
  imagesError: ({ error }) => error,
  imageEditModeEnabled: ({ editModeEnabled }) => editModeEnabled,
};

const actions = {
  async fetchImages({ commit }) {
    try {
      const images = await api.fetchImages();
      commit('setImages', images);
      commit('setError', null);
    } catch (err) {
      commit('setError', err);
    }
  },
  async uploadImages({ commit }, formData) {
    try {
      await api.uploadImages(formData);
      commit('setError', null);
      router.push('/images');
    } catch (err) {
      commit('setError', err);
    }
  },
  async deleteImage({ commit, dispatch }, filename) {
    try {
      await api.deleteImage(filename);
      commit('setError', null);
      dispatch('fetchImages');
    } catch (err) {
      commit('setError', err);
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
      commit('setError', err);
    }
  },
  async patchImage({ commit, dispatch, getters }) {
    try {
      const image = getters.selectedImage;
      if (image.filename) {
        const updatedImage = await api.patchImage(image);
        commit('setSelectedImage', updatedImage);
        dispatch('fetchImages');
      } else {
        throw new Error('image has no filename');
      }
      commit('setEditModeEnabled', false);
    } catch (err) {
      commit('setError', err);
    }
  },
  enableImageEditMode({ commit }) {
    commit('setEditModeEnabled', true);
  },
  disableImageEditMode({ commit }) {
    commit('setEditModeEnabled', false);
  },
  updateImageCaption({ commit }, evt) {
    commit('setSelectedImageCaption', evt.target.value);
  },
  updateImageLocation({ commit }, evt) {
    commit('setSelectedImageLocation', evt.target.value);
  },
  updateImageLocationDateTime({ commit }, evt) {
    commit('setSelectedImageLocationDateTime', evt.target.value);
  },
  updateImageDescription({ commit }, evt) {
    commit('setSelectedImageDescription', evt.target.value);
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images
  },
  setError(state, error) {
    state.imagesError = error
  },
  setSelectedImage(state, image) {
    state.selectedImage = image;
  },
  setEditModeEnabled(state, enabled) {
    state.editModeEnabled = enabled;
  },
  setSelectedImageCaption(state, caption) {
    state.selectedImage.caption = caption;
  },
  setSelectedImageLocation(state, location) {
    state.selectedImage.location = location;
  },
  setSelectedImageLocationDateTime(state, dateTime) {
    state.selectedImage.locationDateTime = dateTime;
  },
  setSelectedImageDescription(state, description) {
    state.selectedImage.description = description;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
