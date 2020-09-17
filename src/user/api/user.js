import {
    instance
} from '@/api';

//登录
export const login = params => {
    return instance.post(`/login`, params)
}

//用户权限
export const permission = params => {
    return instance.get(`/currentUser/permissions`, {params})
}

//用户信息
export const info = params => {
    return instance.get(`/currentUser/userInfo`, {params})
}
//修改密码
export const editPassword = params => {
    return instance.put(`/currentUser/password`, params)
}

//切换身份
export const switchRole = params => {
    return instance.get(`/currentUser/switchRole`, {params})
}
