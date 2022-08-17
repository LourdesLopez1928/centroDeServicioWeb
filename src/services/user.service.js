import { useRouter } from 'next/router'
import { apiUrl } from '../configs/apiConfig'
import { fetchWrapper } from 'helpers'

export const userService = {
  auth,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

const baseUrl = `${apiUrl}/users`


async function auth(user) {
  const { email, password } = user

  return fetchWrapper
    .post(`${baseUrl}/auth/login`, {
      email,
      password
    })
    .then(res => {
      sessionStorage.setItem('token', res?.session?.token)
      sessionStorage.setItem('user', JSON.stringify(res?.user))

      return {
        status: 'success',
        loading: false
      }
    })
    .catch(e => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      
return {
        loading: false,
        status: 'error',
        message: e?.data?.message || 'server-error'
      }
    })
}

async function getAll(token) {
  return fetchWrapper
    .getAuth(baseUrl, token)
    .then(res => {
      return {
        users:res?.users,
        status:res?.status
      }
    })
    .catch(err => {})
}

function getById(token,id) {
  return fetchWrapper.get(token,`${baseUrl}/${id}`)
}


function create(token,params) {
  return fetchWrapper
  .post(`${baseUrl}`, params, token)
    .then(res => {
      return {
        data: res.user,
        status: res.status
      }
    })
    .catch(e => {
      return {
        error: e?.response?.data?.message || 'server-error',
        status: false
      }
    })
}

function update(id, params,token) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params, token)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
}

async function fetchPostUser(data) {
  console.log(data)
}
