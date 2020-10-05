import http from './http';

export default {
  fetchImages() {
    return http.get(`${process.env.VUE_APP_API_URL}/images`);
  },
};
