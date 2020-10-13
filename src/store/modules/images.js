import api from '../../api/images';
import router from '../../router';
import mapInput from '../../utils/map-input';

const state = {
  images: [],
  page: 1,
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
  currentPage: ({ page }) => page,
  pathToUploads: ({ pathToUploads }) => pathToUploads,
  selectedImage: ({ selectedImage }) => selectedImage,
  imagesError: ({ error }) => error,
  imageEditModeEnabled: ({ editModeEnabled }) => editModeEnabled,
};

const actions = {
  async fetchImages({ commit, state }) {
    try {
      const images = await api.fetchImages({ page: state.page });
      commit('setImages', images);
      commit('setError', null);
    } catch (err) {
      commit('setError', err);
    }
  },
  nextPage({ commit, dispatch, state }) {
    if (state.images.length < 10) {
      commit('setPage', state.page + 1);
      dispatch('fetchImages');      
    }
  },
  previousPage({ commit, dispatch, state }) {
    if (state.page > 1) {
      commit('setPage', state.page - 1);
      dispatch('fetchImages');      
    }
  },
  async uploadImages({ commit }, formData) {
    try {
      await api.uploadImages(formData);
      commit('setError', null);
      router.push('/uploads');
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
  updateImageCaption({ commit, getters }, evt) {
    evt.currentValue = getters.selectedImage.caption || '';
    evt.keyMap = getters.selectedKeyMap;
    commit('setSelectedImageCaption', mapInput(evt));
  },
  updateImageLocation({ commit, getters }, evt) {
    evt.currentValue = getters.selectedImage.location || '';
    evt.keyMap = getters.selectedKeyMap;
    commit('setSelectedImageLocation', mapInput(evt));
  },
  updateImageLocationDateTime({ commit }, evt) {
    commit('setSelectedImageLocationDateTime', evt.target.value);
  },
  updateImageDescription({ commit, getters }, evt) {
    evt.currentValue = getters.selectedImage.description || '';
    evt.keyMap = getters.selectedKeyMap;
    commit('setSelectedImageDescription', mapInput(evt));
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images
  },
  setError(state, error) {
    state.imagesError = error
  },
  setPage(state, page) {
    state.page = page;
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
