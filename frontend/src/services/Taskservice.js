import { request } from "./request";

export function CreateTask (data, projectId, boardId) {
  return request({
    url: `/task/${projectId}/${boardId}`,
    method: 'post',
    data
  })
}

export function ListTasks (projectId, boardId, params) {
  console.log(params)
  return request({
    url: `/task/${projectId}/${boardId}`,
    method: 'get',
    params
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

export function GetTaskPerPeriod (projectId, params) {
  return request({
    url: `/task/${projectId}`,
    method: 'get',
    params
  })
}
export function GetTaskPerUser (projectId) {
  return request({
    url: `/task-user/${projectId}`,
    method: 'get',
  })
}

export function GetTaskPerBoard (projectId) {
  return request({
    url: `/task-board/${projectId}`,
    method: 'get',
  })
}

export function GetTaskPerProject (projectId, params) {
  return request({
    url: `/task-list/${projectId}`,
    method: 'get',
    params
  })
}