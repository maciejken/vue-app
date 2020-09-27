import axios from 'axios';

export default {
  get(opts) {
    const { url, headers, auth } = opts;
    return axios({ url, headers, auth, method: 'get' });
  }
};