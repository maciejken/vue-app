export default {
  async get(url, opts = {}) {
    const { headers } = opts;
    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include'
    });
    const contentType = response.headers.get('Content-Type');
    const data = contentType.startsWith('text/html') ? response.text() : response.json();      
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  }
};
