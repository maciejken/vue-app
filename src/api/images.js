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
  async deleteImages({ apiUrl, userId, filename }) {
    let url;
    const opts = {};
    if (Array.isArray(filename)) {
      url = `${apiUrl}/users/${userId}/uploads`;
      opts.body = JSON.stringify({ filename });
      opts.headers = { 'Content-Type': 'application/json' };
    } else {
      url = `${apiUrl}/users/${userId}/uploads/${filename}`;
    }
    return http.delete(url, opts);
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
