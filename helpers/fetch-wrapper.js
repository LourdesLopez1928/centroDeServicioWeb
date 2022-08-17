export const fetchWrapper = {
  get,
  getAuth,
  post,
  put,
  delete: _delete
}

function get(token, url) {
  const requestOptions = {
    method: 'GET',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` }
  }

  return fetch(url, requestOptions).then(handleResponse)
}
function getAuth(url, token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` }
  }

  return fetch(url, requestOptions).then(handleResponse)
}

function post(url, body, token) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  }

  console.log(requestOptions)

  return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body, token) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  }

  return fetch(url, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(url, requestOptions).then(handleResponse)
}

// helper functions

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      const error = (data && data.message) || response.statusText

      return Promise.reject(error)
    }

    return data
  })
}
