import {instance} from '@/common/api';
import CryptoJS from "crypto-js";
//登录
export const login = params => {
  return instance.post(`/login`, {
    userNo: params.userNo,
    password: CryptoJS.MD5(params.password).toString()
  })
}

//用户权限
export const permission = {
  p: ['get,/currentUser/permissions/'],
  r: params => {
    return instance.get(`/currentUser/permissions/`)
  }
}

//用户信息
export const info = {
  p: ['get,/currentUser/userInfo/'],
  r: params => {
    return instance.get(`/currentUser/userInfo/`)
  }
}
//修改密码
export const editPassword = {
  p: ['put,/user/password/'],
  r: params => {
    return instance.put(`/user/password/`, {
      password: CryptoJS.MD5(params.password).toString(),
      newPassword: CryptoJS.MD5(params.newPassword).toString()
    })
  }
}