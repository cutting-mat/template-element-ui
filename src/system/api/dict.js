import { instance } from '@/core/request';
import { requestWrapper } from "@/core";

//
export const list = params => {
    return instance.get(`/dict/s`, { params })
}

export const add = params => {
    return instance.post(`/dict`, params)
}

export const edit = params => {
    return instance.put(`/dict`, params)
}

export const remove = params => {
    return instance.delete(`/dict`, { params })
}

export const itemList = (params, opt) => {
    return requestWrapper(params => {
        return instance.get(`/dict/item/s`, { params })
    }, params, opt)
}

export const itemAdd = params => {
    return instance.post(`/dict/item`, params)
}

export const itemEdit = params => {
    return instance.put(`/dict/item`, params)
}

export const itemRemove = params => {
    return instance.delete(`/dict/item`, { params })
}