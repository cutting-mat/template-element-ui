import {instance} from '@/api';

//
export const list = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`/roles`, {params})
  }
}

export const add = {
  p: ['post,/role'],
  r: params => {
    return instance.post(`/role`, params)
  }
}

export const edit = {
  p: ['put,/role'],
  r: params => {
    return instance.put(`/role`, params)
  }
}

export const remove = {
  p: ['delete,/role'],
  r: params => {
    return instance.delete(`/role`, {params})
  }
}
