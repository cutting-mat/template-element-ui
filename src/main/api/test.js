import { axiosInstance as instance } from "@/core";

// 未授权请求
export const Unauthorized = (params, opt) => {
    return instance.get(`/Unauthorized`, opt)
}
// 业务失败
export const fail = (params, opt) => {
    return instance.get(`/return/fail`, opt)
}
// 接口异常
export const error = (params, opt) => {
    return instance.get(`/return/error`, opt)
}
