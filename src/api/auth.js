import http from './http';

export default {
  authenticate({ apiUrl, auth }) {
    let opts;
    if (auth) {
      opts = {
        headers: {
          Authorization: `Basic ${btoa(`${auth.email}:${auth.password}`)}`
        },        
      };
    }
    return http.get(`${apiUrl}/auth`, opts);
  },
};
