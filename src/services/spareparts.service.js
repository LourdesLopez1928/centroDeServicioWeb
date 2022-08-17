import { useRouter } from 'next/router'
import { apiUrl } from '../configs/apiConfig'
import { fetchWrapper } from 'helpers'

export const sparepartsService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

const baseUrl = `${apiUrl}/spareparts`

// const baseUrl = `http://localhost:3000/api/spareparts`

function create(params) {
  console.log(params);
  
return fetchWrapper
    .post(`${baseUrl}`, params)
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

function getAll() {}
function getById() {}
function _delete() {}
function update() {}
