import { useRouter } from 'next/router'
import { apiUrl } from '../configs/apiConfig'
import { fetchWrapper } from 'helpers'

export const machinesService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
}


const baseUrl = `${apiUrl}/machines`

// const baseUrl = `http://localhost:3000/api/customers`



async function getAll(token) {
  return fetchWrapper
    .getAuth(baseUrl, token)
    .then(res => {
      return {
        machines:res.machines,
        status:res.status
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
        data: res.machine,
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
        update:res.machine,
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
