import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
  async fetchAuthToken(basicAuthBase64) {
    const apiUrl = process.env.VUE_APP_API_URL;
    const opts = {
      url: `${apiUrl}/auth`,
      headers: {
        Authorization: `Basic ${basicAuthBase64}`,
      }
    };
    const response = await axios(opts);
    return response.data;
  },

  verifyApiToken(token) {
    return jwtDecode(token);
  }
};
