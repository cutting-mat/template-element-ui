import {
    instance
} from '@/api';

//
export const list = params => {
    return instance.get(`/resources`, {
        params
    })
}

export const add = params => {
    return instance.post(`/resource`, params)
}

export const edit = params => {
    return instance.put(`/resource`, params)
}

export const remove = params => {
    return instance.delete(`/resource`, {
        params
    })
}