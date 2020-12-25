import qs from 'qs';
import http from './http';

export default {
  async fetchImages({ apiUrl, query }) {
    return http.get(`${apiUrl}/images?${qs.stringify(query)}`);
  },
  async uploadImages({ apiUrl, formData, groupId, isPublicUpload }) {
    let url;
    if (isPublicUpload) {
      url = `${apiUrl}/uploads/public`;
    } else {
      const query = { groupId };
      url = `${apiUrl}/uploads?${qs.stringify(query)}`
    } 
    return http.post(url, {
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
    return http.patch(`${apiUrl}/groups/${image.groupId}/images/${image.filename}`, {
      body: JSON.stringify(image),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
