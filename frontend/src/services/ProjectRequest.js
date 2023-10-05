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

export function ListFilteredProject (params) {
  return request({
    url: '/project-name',
    method: 'get',
    params
  })
}

export function ListProjectParticipants (projectId) {
  return request({
    url: `/project-users/${projectId}`,
    method: 'get',
  })
}

export function EditProject (projectId, data) {
  return request({
    url: `/project/${projectId}`,
    method: 'put',
    data
  })
}

export function GetProjectById (projectId) {
  return request({
    url: `/project/${projectId}`,
    method: 'get',
  })
}

export function LeaveProject (projectId) {
  return request({
    url: `/project-leave/${projectId}`,
    method: 'put',
  })
}

export function ChangeProjectStatus (projectId) {
  return request({
    url: `/project-status/${projectId}`,
    method: 'put',
  })
}


