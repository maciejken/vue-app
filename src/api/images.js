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
      url = `${apiUrl}/groups/${groupId}/uploads`
    } 
    return http.post(url, {
      body: formData
    });
  },
  async deleteImage({ apiUrl, userId, filename }) {
    return http.delete(`${apiUrl}/users/${userId}/uploads/${filename}`);
  },
  async fetchImage({ apiUrl, groupId, filename }) {
    return http.get(`${apiUrl}/groups/${groupId}/images/${filename}`);
  },
  async patchImage({ apiUrl, image }) {
    const { userId, filename } = image;
    return http.patch(`${apiUrl}/users/${userId}/images/${filename}`, {
      body: JSON.stringify(image),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
