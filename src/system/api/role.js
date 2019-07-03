import {instance} from '@/common/api';

//
export const list = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`/roles`, {params})
  }
}

export const add = {
  p: ['post,/roles'],
  r: params => {
    return instance.post(`/roles`, params)
  }
}

export const edit = {
  p: ['put,/roles/*'],
  r: params => {
    return instance.put(`/roles/${params.roleId}`, params)
  }
}

export const remove = {
  p: ['delete,/roles/*'],
  r: params => {
    return instance.delete(`/roles/${params.roleId}`)
  }
}

