import { request } from "./request";

export function CreateMessage (projectId, data) {
  return request({
    url: `/message/${projectId}`,
    method: 'post',
    data
  })
}

export function ListMessages (projectId) {
  return request({
    url: `/message/${projectId}`,
    method: 'get',
  })
}