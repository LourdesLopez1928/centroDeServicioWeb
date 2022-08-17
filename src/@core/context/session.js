import axios from 'axios'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export const SessionContext = createContext()

const fetcher = path => {
  // const Router = useRouter()
  let token = sessionStorage.getItem('token')

  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  return axios.get(path, config)
}

export function SessionProvider({ children }) {
  const router = useRouter()

  const { data: session } = useSWR(`/api/user`, fetcher, {
    refreshInterval: 300000,
    onSuccess: data => {},
    onError: err => {
     
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      router.push('/pages/login')
    }
  })

  // console.log(session);

  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>
}

export default function useSession(opts) {
  const payload = useContext(SessionContext)

  return payload
}
