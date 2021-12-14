import { instance } from '@/core/request';

//
export const list = params => {
  return instance.get(`/account/s`, { params })
}

export const detail = params => {
  return instance.get(`/account`, { params })
}


export const add = params => {
  return instance.post(`/account`, params)
}

export const edit = params => {
  return instance.put(`/account`, params)
}

export const remove = params => {
  return instance.delete(`/account`, { params })
}

//重置密码
export const resetPassword = params => {
  return instance.put(`/account/reset`, params)
}
