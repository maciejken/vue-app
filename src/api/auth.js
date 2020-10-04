import http from './http';

export default {
  fetchAccessToken({ username, password }) {
    const opts = {
      url: `${process.env.VUE_APP_API_URL}/auth`,
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      },
    };
    return http.get(opts);
  },
};
