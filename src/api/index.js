import axios from 'axios';
import * as util from '../assets/util.js';

export const baseURL = 'http://rap2api.taobao.org/app/mock/3567';

export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type':'application/json'
  }
});

// 请求处理
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

//错误处理
instance.interceptors.response.use(function(response) {
  if(response.data.status!=200){
    return util.catchError(response);
  }
  return response;
}, util.catchError);
