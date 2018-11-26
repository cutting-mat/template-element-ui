import axios from 'axios';
import * as util from '../assets/util.js';

const URLHASH = {
  mock: 'http://rap2api.taobao.org/app/mock/3567',
  dev: 'http://view.sooc.com',
  test: ''
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
  if(response.data.status!=200){
    return util.catchError(response);
  }
  return response;
}, util.catchError);
