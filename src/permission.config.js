import Vue from 'vue';
import { util, routeGenerator } from "@/core";

const routeInstance = routeGenerator()
// 权限插件配置
export default {
    AccessControl: false,    // 权限控制
    routeInstance
}

// 获取用户登录凭据方法
export const GetAccountToken = () => {
    const storageFun = Vue.$store.state.rememberLogin ? localStorage : sessionStorage;
    return util.storage("auth", undefined, storageFun)
}

// 设置用户登录凭据方法
export const SetAccountToken = token => {
    const storageFun = Vue.$store.state.rememberLogin ? localStorage : sessionStorage;
    return util.storage("auth", token, storageFun)
}

// 登录接口数据转用户凭据方法
export const GetTokenFromLogin = res => res.data.accessToken

// 获取用户权限数据方法（需要返Promise）
export const GetPermission = () => Vue.$store.action("permission");

// 获取路由权限后回调
export const AfterGetDynamicRoute = routes => Vue.$store.set("DynamicRoute", routes);

