import { axiosInstance as instance } from "@/core";

// 修改密码
export const editPassword = (params, config) => {
    return instance.put(`/updatePassword`, params, config)
}
