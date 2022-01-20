import { instance, cacheAxios } from "@/core";
cacheAxios.create(instance)

//登录
export const login = params => {
    return instance.post(`/login`, params)
}

//用户权限
export const permission = (params) => {
    return instance.get(`/getPermissions`, { params })
}

//用户信息
export const info = (params, opt) => {
    return cacheAxios.get(`/getAccountInfo`, { params }, opt)
}

//修改密码
export const editPassword = params => {
    return instance.put(`/updatePassword`, params)
}

//切换身份
export const switchRole = params => {
    return instance.get(`/switchIdentity`, { params })
}
