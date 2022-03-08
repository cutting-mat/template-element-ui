import { instance } from '@/core';

// list
export const list = params => {
  return instance.get(`/orgs`, { params })
}
// get
export const get = params => {
  return instance.get(`/org`, { params })
}
// post
export const add = params => {
  return instance.post(`/org`, params)
}
// put
export const edit = params => {
  return instance.put(`/org`, params)
}
// delete
export const remove = params => {
  return instance.delete(`/org`, { params })
}
