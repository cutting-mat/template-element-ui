import axios from 'axios';
import * as util from '@/common/assets/util';

const URLHASH = {
  mock: 'http://rap2api.taobao.org/app/mock/223572',
  dev: 'http://172.17.2.1:8187',
  test: '//test.com/api',
  master: '//master.com/api'
};

const SERVER = {
  "test.com": "/api",
  "master.com" : "/api"
}

export const baseURL = SERVER[window.location.host] || URLHASH.mock;

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
}, function (error) {
  return util.catchError(error);
});
