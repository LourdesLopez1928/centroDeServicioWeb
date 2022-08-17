import { useRouter } from 'next/router'
import { apiUrl } from '../configs/apiConfig'
import { fetchWrapper } from 'helpers'

export const customerService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
}


const baseUrl = `${apiUrl}/customers`

// const baseUrl = `http://localhost:3000/api/customers`



async function getAll(token) {
  return fetchWrapper
    .getAuth(baseUrl, token)
    .then(res => {
      return res
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
        console.log(res);
      
return {
        data: res.customer,
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
  .then((res)=>{
    return {
        update:res.customer,
        status:res.status
    }
  })
  .catch((err)=>{
    console.log(err);
    
return {
        status:err.status,
        message:err.message
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
