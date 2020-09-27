import http from './http';

export default {
  fetchAccessToken(auth) {
    const opts = {
      url: `${process.env.VUE_APP_API_URL}/auth`,
      auth,
    };
    return http.get(opts);
  },
};
