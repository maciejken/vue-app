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
    location: null,
    datetime: null,
    description: null,
    camera: null,
    width: null,
    height: null,
    size: null,
    createdAt: null,
    updatedAt: null,
  },
  imagesChecked: [],
  error: null,
  editMode: false,
  deleteMode: false,
};

const getters = {
  uploadedImages: ({ images }) => images,
  currentPage: ({ page }) => page,
  selectedImage: ({ selectedImage }) => selectedImage,
  selectedImageCaptureDate: ({ selectedImage }) => new Date(selectedImage.datetime).toLocaleString('pl'),
  selectedImageDimensions: ({ selectedImage }) => {
    const { width, height } = selectedImage;
    return `${width} x ${height}`;
  },
  selectedImageMegabytes: ({ selectedImage }) => Math.round(10 * selectedImage.size/(1024 * 1024))/10,
  checkedImages: ({ imagesChecked }) => imagesChecked,
  imagesError: ({ error }) => error,
  editImageMode: ({ editMode }) => editMode,
  deleteImageMode: ({ deleteMode }) => deleteMode,
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
      const groupId = rootState.users.userGroups[0];
      await api.uploadImages({ apiUrl, formData, groupId });
      commit('setError', null);
      router.push('/uploads');
    } catch (err) {
      commit('setError', err);
    }
  },
  async deleteImage({ commit, dispatch, rootState }, filename) {
    try {
      const { apiUrl } = rootState.settings;
      await api.deleteImage({ apiUrl, filename });
      commit('setError', null);
      dispatch('fetchImages');
    } catch (err) {
      commit('setError', err);
    } finally {
      commit('SET_IMAGE_DELETE_MODE', false);
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
    commit('SET_IMAGES_CHECKED', checked);
  },
  async fetchImage({ commit, rootState }, filename) {
    try {
      const { apiUrl } = rootState.settings;
      const image = await api.fetchImage({ apiUrl, filename });
      commit('setSelectedImage', image);
    } catch (err) {
      commit('setError', err);
    }
  },
  async patchImage({ commit, dispatch, rootState }) {
    try {
      const { apiUrl } = rootState.settings;
      const { selectedImage } = rootState.images;
      if (selectedImage.filename) {
        const updatedImage = await api.patchImage({
          apiUrl,
          image: selectedImage,
        });
        commit('setSelectedImage', updatedImage);
        dispatch('fetchImages');
      } else {
        throw new Error('image has no filename');
      }
      commit('SET_IMAGE_EDIT_MODE', false);
    } catch (err) {
      commit('setError', err);
    }
  },
  enableImageEditMode({ commit }) {
    commit('SET_IMAGE_EDIT_MODE', true);
  },
  disableImageEditMode({ commit }) {
    commit('SET_IMAGE_EDIT_MODE', false);
  },
  enableImageDeleteMode({ commit }) {
    commit('SET_IMAGE_DELETE_MODE', true);
  },
  disableImageDeleteMode({ commit }) {
    commit('SET_IMAGE_DELETE_MODE', false);
  },
  updateSelectedImage({ commit }, image) {
    commit('setSelectedImage', image);
  },
  updateImageLocationDateTime({ commit }, evt) {
    commit('setSelectedImageLocationDateTime', evt.target.value);
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
  SET_IMAGES_CHECKED(state, filenames) {
    state.imagesChecked = filenames;
  },
  SET_IMAGE_EDIT_MODE(state, enabled) {
    state.editMode = enabled;
  },
  SET_IMAGE_DELETE_MODE(state, enabled) {
    state.deleteMode = enabled;
  },
  setSelectedImageLocationDateTime(state, dateTime) {
    state.selectedImage.locationDateTime = dateTime;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
