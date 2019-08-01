import {instance} from '@/api';

//
export const list = {
  p: ['get,/resources'],
  r: params => {
    return instance.get(`/resources`, {params})
  }
}

export const add = {
  p: ['post,/resources'],
  r: params => {
    return instance.post(`/resources`, params)
  }
}

export const edit = {
  p: ['put,/resources'],
  r: params => {
    return instance.put(`/resources`, params)
  }
}

export const remove = {
  p: ['delete,/resources'],
  r: params => {
    return instance.delete(`/resources`, {params})
  }
}

