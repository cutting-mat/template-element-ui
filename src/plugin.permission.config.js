import { store } from "@/core/plugins/store";

import { storage } from "@/core";

/**
 * 权限模块功能配置
 * AccessControl：是否开启权限控制
 * interceptorsRequest：是否开启请求拦截（需开启权限控制）
 * */
export default {
  AccessControl: false,
  interceptorsRequest: false,
};

/**
 * 获取用户登录凭据方法
 * @return Token[String]
 * */
export const GetAccountToken = () => {
  return storage("auth");
};

/**
 * 设置用户登录凭据方法
 * @param token[String] 用户登录凭据
 * @return [Any] 存储token，可被GetAccountToken()获取
 * */
export const SetAccountToken = (token) => {
  return storage("auth", token);
};

/**
 * 获取用户权限数据方法
 * @return request[Promise] 请求用户权限数据的Promise实例
 * */
export const GetPermission = () => store.getPermission();

/**
 * 获取路由权限后回调
 * @param routes[Array] 动态路由
 * @return [Any]
 * */
export const AfterGetDynamicRoute = (routes) => (store.DynamicRoute = routes);

/**
 * 未认证用户回调
 * @param to[Object] 路由守卫(beforeEach)方法的同名参数
 * @param from[Object] 路由守卫(beforeEach)方法的同名参数
 * @param next[Object] 路由守卫(beforeEach)方法的同名参数
 * @return next() || [Any]
 * */
export const AuthFailedCallback = (to, from, next) => {
  if (to.path !== "/login") {
    // 未登录跳转登录页
    let query = {
      redirect: to.fullPath,
    };
    return next({
      path: "/login",
      query,
    });
  }
};
