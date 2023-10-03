import { request } from "./request";

export function CreateTask (data, projectId, boardId) {
  return request({
    url: `/task/${projectId}/${boardId}`,
    method: 'post',
    data
  })
}

export function ListTasks (projectId, boardId) {
  return request({
    url: `/task/${projectId}/${boardId}`,
    method: 'get',
  })
}