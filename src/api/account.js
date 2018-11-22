import {instance} from './index';
import CryptoJS from "crypto-js";
//登录
export const login = params => {
  let md5password = CryptoJS.MD5(params.password).toString()
  return instance.post(`/login`, {
    username: params.username,
    password: md5password
  })
}
