import http from './http';

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  async fetchImages() {
    return http.get(`${apiUrl}/images`);
  },
  async uploadImages(formData) {
    return http.post(`${apiUrl}/uploads`, {
      body: formData
    });
  },
  async deleteImage(filename) {
    return http.delete(`${apiUrl}/uploads/${filename}`);
  },
  async fetchImage(filename) {
    return http.get(`${apiUrl}/images/${filename}`);
  },
  async patchImage(image) {
    return http.patch(`${apiUrl}/images/${image.filename}`, {
      body: JSON.stringify(image),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
