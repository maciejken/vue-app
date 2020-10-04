export default {
  async get(opts) {
    const { url, headers } = opts;
    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include'
    });
    const contentType = response.headers.get('Content-Type');
    return contentType.startsWith('text/html') ? response.text() : response.json();
  }
};
