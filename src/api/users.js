import http from './http';

export default {
  createUser({ apiUrl, user }) {
    return http.post(`${apiUrl}/users`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  },
  getUserGroups({ apiUrl, userId }) {
    return http.get(`${apiUrl}/users/${userId}/groups`);
  },
}
