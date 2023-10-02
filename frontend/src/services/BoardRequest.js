import { request } from "./request";


export function ListBoards (projectId) {
  return request({
    url: `/board/${projectId}`,
    method: 'get',
  })
}

export function CreateBoard (projectId, data) {
  return request({
    url: `/board/${projectId}`,
    method: 'post',
    data
  })
}