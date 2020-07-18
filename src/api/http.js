import axios from 'axios';

const errorHandler = err => {
  console.log(err.message);
}

export default {
  get(opts) {
    const { url, headers, auth } = opts;
    return axios({ url, headers, auth, method: 'get' })
    .then(res => res.data)
    .catch(errorHandler);
  }
};