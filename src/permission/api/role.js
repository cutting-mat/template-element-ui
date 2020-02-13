import {instance} from '@/api';

//
export const list = params => {
    return instance.get(`/roles`, {params})
}

export const add = params => {
    return instance.post(`/role`, params)
}

export const edit = params => {
    return instance.put(`/role`, params)
}

export const remove = params => {
    return instance.delete(`/role`, {params})
}
