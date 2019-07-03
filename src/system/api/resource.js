import {instance} from '@/common/api';

//
export const list = {
  p: ['get,/menus'],
  r: params => {
    return instance.get(`/menus`, {params})
  }
}

export const add = {
  p: ['post,/menus'],
  r: params => {
    return instance.post(`/menus`, params)
  }
}

export const edit = {
  p: ['put,/menus/*'],
  r: params => {
    return instance.put(`/menus/${params.id}`, params)
  }
}

export const remove = {
  p: ['delete,/menus/*'],
  r: params => {
    return instance.delete(`/menus/${params.id}`)
  }
}

