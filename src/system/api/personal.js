import { axiosInstance as instance } from "@/core";

//用户信息
export const profile = (params, opt) => {
    return instance.get(`/getAccountInfo`, { params }, opt)
}

//切换身份
export const switchRole = params => {
    return instance.get(`/account/front/identity/switch`, { params })
}
