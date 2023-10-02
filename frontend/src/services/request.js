import { toast } from 'react-toastify';
import axios from 'axios'
import { notify } from '../Utils/Notifications';

const service = () => {
  const tokenAuth = localStorage.getItem('token')
  const token = 'Bearer ' + tokenAuth
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
        notify(error.response.data.message, 'error')
      }
      if (error.response.status === 403) {
        window.location.href = "http://localhost:3000/login"
        localStorage.clear()
        notify(error.response.data.message, 'error')
        return Promise.reject(error)
      }

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