import { instance, cacheAxios } from "@/core";
cacheAxios.create(instance);

// get
export const get = (params, opt) => {
  return cacheAxios.get(`/url`, { params }, opt)
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
