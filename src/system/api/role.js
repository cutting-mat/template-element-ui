import { axiosInstance as instance } from "@/core";

//
export const list = params => {
    return instance.get(`/role/s`, { params })
}

export const detail = params => {
    return instance.get(`/role`, {params})
}

export const add = params => {
    return instance.post(`/role`, params)
}

export const edit = params => {
    return instance.put(`/role`, params)
}

export const remove = params => {
    return instance.delete(`/role`, { params })
}
