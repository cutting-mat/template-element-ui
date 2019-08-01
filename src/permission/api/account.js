import {instance} from '@/api';

//
export const list = {
  p: ['get,/user'],
  r: params => {
    return instance.get(`/user`, {params})
  }
}

export const add = {
  p: ['post,/user'],
  r: params => {
    return instance.post(`/user`, params)
  }
}

export const edit = {
  p: ['put,/user'],
  r: params => {
    return instance.put(`/user`, params)
  }
}

export const remove = {
  p: ['delete,/user/*'],
  r: params => {
    return instance.delete(`/user`, {params})
  }
}

//重置密码
export const resetPassword = {
  p: ['put,/user/password/'],
  r: params => {
    return instance.put(`/user/password/`, params)
  }
}
