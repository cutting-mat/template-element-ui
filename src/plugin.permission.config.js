import Store from '@/core/plugins/store/store';
const $store = Store();

import { util, routeGenerator } from "@/core";

const routeInstance = routeGenerator()
/**
 * 权限模块功能配置
 * routeInstance：路由实例，必传
 * AccessControl：是否开启权限控制
 * interceptorsRequest：是否开启请求拦截（需开启权限控制）
 * */ 
export default {
    routeInstance,
    AccessControl: false,
    interceptorsRequest: true
}

/**
 * 获取用户登录凭据方法
 * @return Token[String]
 * */ 
export const GetAccountToken = () => {
    const storageFun = $store.state.rememberLogin ? localStorage : sessionStorage;
    return util.storage("auth", undefined, storageFun)
}

/**
 * 设置用户登录凭据方法
 * @param token[String] 用户登录凭据
 * @return [Any] 存储token，可被GetAccountToken()获取
 * */ 
export const SetAccountToken = token => {
    const storageFun = $store.state.rememberLogin ? localStorage : sessionStorage;
    return util.storage("auth", token, storageFun)
}

/**
 * 登录接口返回数据转用户凭据的方法
 * @param res[String] 登录接口返回数据
 * @return token[String] 用户登录凭据
 * */ 
export const GetTokenFromLogin = res => res.data

/**
 * 获取用户权限数据方法
 * @return request[Promise] 请求用户权限数据的Promise实例
 * */ 
export const GetPermission = () => $store.action("permission");

/**
 * 获取路由权限后回调
 * @param routes[Array] 动态路由
 * @return [Any]
 * */ 
export const AfterGetDynamicRoute = routes => $store.set("DynamicRoute", routes);

