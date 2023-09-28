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

export function ListUserByLetter (params) {
  return request({
    url: '/user-letter',
    method: 'get',
    params
  })
}

export function GetUserById (userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get',
  })
}

export function UpdateUser (userId, data) {
  return request({
    url: `user/${userId}`,
    method: 'post',
    data
  })
}