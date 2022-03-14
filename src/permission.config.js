import Vue from 'vue';
import { util } from "@/core";

// 获取用户登录凭据方法
export const GetAccountToken = () => util.storage("auth")

// 设置用户登录凭据方法
export const SetAccountToken = token => util.storage("auth", token)

// 登录接口数据转用户凭据方法
export const GetTokenFromLogin = res => res.data.accessToken

// 获取用户权限数据方法（需要返Promise）
export const GetPermission = () => Vue.$store.action("permission");

// 获取路由权限后回调
export const AfterGetDynamicRoute = routes => Vue.$store.set("DynamicRoute", routes);

