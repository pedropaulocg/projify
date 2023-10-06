import { request } from "./request";


export function CreateComment(taskId, data){
  return request({
    url: `/comment/${taskId}`,
    method: 'post',
    data
  })
}

export function GetComments(taskId){
  return request({
    url: `/comment/${taskId}`,
    method: 'get',
  })
}

export function DeleteComment(commentId){
  return request({
    url: `/comment/${commentId}`,
    method: 'delete',
  })
}