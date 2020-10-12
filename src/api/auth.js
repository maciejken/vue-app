import http from './http';

export default {
  authenticate(auth) {
    let opts;
    if (auth) {
      opts = {
        headers: {
          Authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`
        },        
      };
    }
    return http.get(`${process.env.VUE_APP_API_URL}/auth`, opts);
  },
};
