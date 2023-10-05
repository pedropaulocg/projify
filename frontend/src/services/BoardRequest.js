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

export function UpdateBoard (boardId, data) {
  return request({
    url: `/board/${boardId}`,
    method: 'put',
    data
  })
}

export function DeleteBoard (boardId) {
  return request({
    url: `/board/${boardId}`,
    method: 'delete',
  })
}