import { toast } from 'react-toastify';
import axios from 'axios'

const service = () => {
  const tokenAuth = localStorage.getItem('token')
  const token = 'Bearer ' + tokenAuth
  console.log(token)
  const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  })

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      if (error.response.status === 403)
      return Promise.reject(error)
    }
  )

  return api
}

export async function request({ url, method, params, data }) {
  const request = service()
  let responseData = {}

  const requestConfig = {
    url,
    params,
    method,
    data
  }

  try {
    const response = await request.request(requestConfig)
    responseData = response
  } catch (error) {
    return Promise.reject(error)
  }
  return responseData
}