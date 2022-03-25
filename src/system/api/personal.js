import { axiosInstance as instance } from "@/core";

//用户信息
export const profile = (params, opt) => {
    return instance.get(`/getAccountInfo`, { params }, opt)
}

//修改密码
export const editPassword = params => {
    return instance.put(`/updatePassword`, params)
}

//切换身份
export const switchRole = params => {
    return instance.get(`/account/front/identity/switch`, { params })
}
