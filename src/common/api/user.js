import {
    instance
} from '@/api';

import CryptoJS from "crypto-js";
//登录
export const login = params => {
    return instance.post(`/login`, {
        username: params.username,
        password: CryptoJS.MD5(params.password).toString()
    })
}

//用户权限
export const permission = params => {
    return instance.get(`/currentUser/permissions/`)
}

//用户信息
export const info = params => {
    return instance.get(`/currentUser/userInfo/`)
}
//修改密码
export const editPassword = params => {
    return instance.put(`/currentUser/password/`, {
        password: CryptoJS.MD5(params.password).toString(),
        old_password: CryptoJS.MD5(params.old_password).toString()
    })
}