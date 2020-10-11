import cookie from 'cookie';

export function getAuthSeconds() {
  const { authExpiration } = cookie.parse(document.cookie);
  let seconds = null;
  if (authExpiration) {
    seconds = parseInt((authExpiration - Date.now())/1000);
  }
  return seconds;
}

export function getAuthExpired() {
  return cookie.serialize('authExpiration', 0, {
    expires: new Date(0)
  });
}
