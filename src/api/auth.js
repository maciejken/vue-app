import http from './http';
import jwtDecode from 'jwt-decode';

export default {
  fetchAuthToken(auth) {
    const opts = {
      url: `${process.env.VUE_APP_API_URL}/auth`,
      auth,
    };
    return http.get(opts);
  },

  verifyApiToken(token) {
    return jwtDecode(token);
  }
};
