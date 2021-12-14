import { instance } from '@/core/request';

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
// 联盟列表
export const unions = params => {
  return instance.get(`/org/leagues`, { params })
}
// 学校列表
export const schools = params => {
  return instance.get(`/org/school/s`, { params })
}
