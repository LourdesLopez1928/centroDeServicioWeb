import { apiUrl } from '../configs/apiConfig'
import { fetchWrapper } from 'helpers'

const baseUrl = `${apiUrl}/companies`

export const companyService = {
  list,
  create,
  update,
  getById

  // create,
  // update,
  // delete: _delete
}

async function create(token, params) {
  return fetchWrapper
    .post(`${baseUrl}`, params, token)
    .then(res => res)
    .catch(err => {
      console.log(err)
      
return {
        status: err.status,
        message: err.message
      }
    })
}

async function list(token) {
  return fetchWrapper
    .get(token, baseUrl)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      
return {
        status: err.status,
        message: err.message
      }
    })
}

async function update(id, params, token) {
  return fetchWrapper
    .put(`${baseUrl}/${id}`, params, token)
    .then(res => res)
    .catch(err => {
      console.log(err)
      
return {
        status: err.status,
        message: err.message
      }
    })
}

async function getById(id, token) {
  return fetchWrapper
  .get(token, `${baseUrl}/${id}`)
  .then(res => res)
  .catch(err => {
    console.log(err)
    
return {
      status: err.status,
      message: err.message
    }
  })
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
}

async function fetchPostUser(data) {
  console.log(data)
}
