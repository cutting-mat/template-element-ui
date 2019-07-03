import axios from 'axios';
import * as util from '../assets/util';

const URLHASH = {
  mock: 'http://rap2api.taobao.org/app/mock/223572',
  dev: 'http://172.16.6.152:1112',
  test: '',
  online: ''
};

export const baseURL = URLHASH.mock;

export const instance = axios.create({
  baseURL,
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
  if(response.status!=200){
    return util.catchError(response);
  }
  return response;
}, util.catchError);
