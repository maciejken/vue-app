import cookie from 'cookie';

function getCookies() {
  return cookie.parse(document.cookie);
}

function setCookies(cookies) {
  document.cookie = cookie.serialize(cookies);
}

export default {
  getAuthExpiration: () => {
    const { authExpiration } = cookie.parse(document.cookie);
    return authExpiration && parseInt(authExpiration);    
  },
  clearAuth: () => {
    const authExpiration = cookie.serialize('authExpiration', 0, {
      expires: new Date(0)
    });
    setCookies(authExpiration);
  },
  getUserData() {
    const cookies = getCookies();
    let data = null;
    if (cookies) {
      const { userId, userGroups } = cookies;
      data = {
        userId: parseInt(userId),
        groups: JSON.parse(userGroups.replace('j:', '')),
      };
    }
    return data;
  },
}
