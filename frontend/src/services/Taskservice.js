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

export function ChangeCardBoard (data) {
  return request({
    url: `/task-board`,
    method: 'put',
    data
  })
}

export function UpdateTask (taskId, data) {
  return request({
    url: `/task/${taskId}`,
    method: 'put',
    data
  })
}

export function DeleteTask (taskId) {
  return request({
    url: `/task/${taskId}`,
    method: 'delete'
  })
}