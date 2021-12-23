import { instance } from '@/core/request';
import { requestWrapper } from "@/core";

// get
export const get = (params, opt) => {
  return requestWrapper(params => {
    return instance.get(`/url`, { params })
  }, params, opt)
}
// post
export const add = (params) => {
  return instance.post(`/url`, params)
}
// put
export const edit = (params) => {
  return instance.put(`/url`, params)
}
// delete
export const remove = (params) => {
  return instance.delete(`/url`, { params })
}
