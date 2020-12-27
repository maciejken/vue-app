import api from '../../api/images';
import router from '../../router';

const state = {
  images: [],
  page: 1,
  selectedImage: {
    filename: null,
    userId: null,
    groupId: null,
    caption: null,
    description: null,
  },
  selectedImageDetails: [],
  imagesChecked: [],
  error: null,
  editMode: false,
  deleteMode: false,
  isPublicUpload: false,
};

const getters = {
  uploadedImages: ({ images }) => images,
  currentPage: ({ page }) => page,
  selectedImage: ({ selectedImage }) => selectedImage,
  selectedImageDetails: ({ selectedImageDetails }) => selectedImageDetails,
  checkedImages: ({ imagesChecked }) => imagesChecked,
  imagesError: ({ error }) => error,
  imageEditMode: ({ editMode }) => editMode,
  imageDeleteMode: ({ deleteMode }) => deleteMode,
  isPublicUpload: ({ isPublicUpload }) => isPublicUpload,
};

const actions = {
  async fetchImages({ commit, rootState, state }) {
    try {
      const { apiUrl } = rootState.settings;
      const query = { page: state.page };
      const images = await api.fetchImages({ apiUrl, query });
      commit('setImages', images);
      commit('setError', null);
    } catch (err) {
      commit('setError', err);
    }
  },
  nextPage({ commit, dispatch, state }) {
    if (state.images.length === 10) {
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
  async uploadImages({ commit, rootState }, formData) {
    try {
      const { apiUrl } = rootState.settings;
      const { groupId } = rootState.users;
      const { isPublicUpload } = rootState.images;
      await api.uploadImages({ apiUrl, formData, groupId, isPublicUpload });
      commit('setError', null);
      router.push('/uploads');
    } catch (err) {
      commit('setError', err);
    }
  },
  async deleteImage({ commit, dispatch, rootState }, filename) {
    try {
      const { apiUrl } = rootState.settings;
      const { userId } = rootState.users;
      await api.deleteImage({ apiUrl, userId, filename });
      commit('setError', null);
      dispatch('fetchImages');
    } catch (err) {
      commit('setError', err);
    } finally {
      commit('setImageDeleteMode', false);
    }
  },
  toggleImageChecked({ commit, state }, filename) {
    const index = state.imagesChecked.indexOf(filename);
    let checked;
    if (index < 0) {
      checked = state.imagesChecked.concat(filename);
    } else {
      checked = state.imagesChecked.slice(index - 1, index)
        .concat(state.imagesChecked.slice(index + 1));
    }
    commit('setImagesChecked', checked);
  },
  async fetchImage({ commit, rootState }, filename) {
    try {
      const { apiUrl } = rootState.settings;
      const { groupId } = rootState.users;
      const image = await api.fetchImage({ apiUrl, groupId, filename });
      const details = image.details.slice();
      delete image.details;
      commit('setSelectedImage', image);
      commit('setSelectedImageDetails', details);
    } catch (err) {
      commit('setError', err);
    }
  },
  async patchImage({ commit, dispatch, rootState }) {
    try {
      const { apiUrl } = rootState.settings;
      const { userId } = rootState.users;
      const { selectedImage } = rootState.images;
      if (!selectedImage.filename) {
        throw new Error('image has no filename');
      } else if (selectedImage.userId === userId) {
        const updatedImage = await api.patchImage({
          apiUrl,
          image: selectedImage,
        });
        commit('setSelectedImage', updatedImage);
        dispatch('fetchImages');
      } else {
        throw new Error(`user ${userId} cannot edit ${selectedImage.filename} image data`);
      }
      commit('setImageEditMode', false);
    } catch (err) {
      commit('setError', err);
    }
  },
  enableImageEditMode({ commit }) {
    commit('setImageEditMode', true);
  },
  disableImageEditMode({ commit }) {
    commit('setImageEditMode', false);
  },
  enableImageDeleteMode({ commit }) {
    commit('setImageDeleteMode', true);
  },
  disableImageDeleteMode({ commit }) {
    commit('setImageDeleteMode', false);
  },
  updateSelectedImage({ commit }, image) {
    commit('setSelectedImage', image);
  },
  updatePublicUpload({ commit }, isPublic) {
    commit('setPublicUpload', isPublic);
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
  setSelectedImageDetails(state, details) {
    state.selectedImageDetails = details;
  },
  setImagesChecked(state, filenames) {
    state.imagesChecked = filenames;
  },
  setImageEditMode(state, enabled) {
    state.editMode = enabled;
  },
  setImageDeleteMode(state, enabled) {
    state.deleteMode = enabled;
  },
  setPublicUpload(state, isPublic) {
    state.isPublicUpload = isPublic;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
