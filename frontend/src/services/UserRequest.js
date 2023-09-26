import { request } from "./request";


export function Login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function Signup (data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  })
}