import cookie from 'cookie';

export default {
  getAuthExpiration: () => {
    const { authExpiration } = cookie.parse(document.cookie);
    return authExpiration && parseInt(authExpiration);    
  },
  clearAuth: () => {
    document.cookie = cookie.serialize('authExpiration', 0, {
      expires: new Date(0)
    });    
  },
}
