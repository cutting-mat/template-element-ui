import {instance} from '@/core/api';

// get
export const get = params => {
  return instance.get(`/login`, {params})
}
// post
export const add = params => {
  return instance.post(`/login`, params)
}
// put
export const edit = params => {
  return instance.put(`/login`, params)
}
// delete
export const remove = params => {
  return instance.delete(`/login`, {params})
}
