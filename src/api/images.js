import http from './http';

export default {
  fetchImages({ accessToken }) {
    const opts = {
      url: `${process.env.VUE_APP_API_URL}/images`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return http.get(opts);
  }
};
