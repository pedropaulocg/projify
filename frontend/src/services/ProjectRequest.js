import { request } from "./request";


export function StoreProject (data) {
  return request({
    url: '/project',
    method: 'post',
    data
  })
}

export function ListProjects () {
  return request({
    url: '/project',
    method: 'get',
  })
}
