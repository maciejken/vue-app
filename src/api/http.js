function getRequestOptions(opts) {
  let headers;
  let body;
  if (opts) {
    headers = opts.headers;
    body = opts.body;
  }
  return {
    headers,
    body,
    credentials: 'include',
  };
}

function getResponseData(response) {
  const contentType = response.headers.get('Content-Type');
  const data = contentType.startsWith('text/html') ? response.text() : response.json();      
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export default {
  async get(url, opts) {
    const response = await fetch(url, {
      method: 'GET',
      ...getRequestOptions(opts)
    });
    return getResponseData(response);
  },
  async post(url, opts) {
    const response = await fetch(url, {
      method: 'POST',
      ...getRequestOptions(opts)
    });
    return getResponseData(response);
  },
  async delete(url, opts) {
    const response = await fetch(url, {
      method: 'DELETE',
      ...getRequestOptions(opts)
    });
    return getResponseData(response);
  },
};
