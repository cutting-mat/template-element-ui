import {instance} from '@/api';

//
export const list = params => {
  return instance.get(`/users`, {params})
}

export const add = params => {
  return instance.post(`/user`, params)
}

export const edit = params => {
  return instance.put(`/user`, params)
}

export const remove = params => {
  return instance.delete(`/user`, {params})
}

//重置密码
export const resetPassword = params => {
  return instance.put(`/user/password/`, params)
}
