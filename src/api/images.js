import qs from 'qs';
import http from './http';

export default {
  async fetchImages({ apiUrl, query }) {
    return http.get(`${apiUrl}/images?${qs.stringify(query)}`);
  },
  async uploadImages({ apiUrl, formData }) {
    return http.post(`${apiUrl}/uploads`, {
      body: formData
    });
  },
  async deleteImage({ apiUrl, filename }) {
    return http.delete(`${apiUrl}/uploads/${filename}`);
  },
  async fetchImage({ apiUrl, filename }) {
    return http.get(`${apiUrl}/images/${filename}`);
  },
  async patchImage({ apiUrl, image }) {
    return http.patch(`${apiUrl}/images/${image.filename}`, {
      body: JSON.stringify(image),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
