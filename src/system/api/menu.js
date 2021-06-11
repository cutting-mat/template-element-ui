import {
    instance
} from '@/api';

//
export const list = params => {
    return instance.get(`/menus`, {
        params
    })
}

export const add = params => {
    return instance.post(`/menu`, params)
}

export const edit = params => {
    return instance.put(`/menu`, params)
}

export const remove = params => {
    return instance.delete(`/menu`, {
        params
    })
}