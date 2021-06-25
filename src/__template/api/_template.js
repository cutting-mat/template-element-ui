import { instance } from '@/core/api';
import { requestWrapper } from "@/core";

// get
export const get = (params, opt) => {
  return requestWrapper(params => {
    return instance.get(`/url`, { params })
  }, params, opt)
}
// post
export const add = (params, opt) => {
  return requestWrapper(params => {
    return instance.post(`/url`, params)
  }, params, opt)
}
// put
export const edit = (params, opt) => {
  return requestWrapper(params => {
    return instance.put(`/url`, params)
  }, params, opt)
}
// delete
export const remove = (params, opt) => {
  return requestWrapper(params => {
    return instance.delete(`/url`, { params })
  }, params, opt)
}
