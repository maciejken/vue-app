import http from './http';

export default {
  authenticate({ username, password }) {
    const opts = { 
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      },
    };
    return http.get(`${process.env.VUE_APP_API_URL}/auth`, opts);
  },
};
