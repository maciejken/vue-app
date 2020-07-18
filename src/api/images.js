import http from './http';

export default {
  getImage(filename, { token }) {
    const opts = {
      url: `${process.env.VUE_APP_API_URL}/images/${filename}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    return http.get(opts);
  }
};
