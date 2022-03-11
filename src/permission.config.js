import Vue from 'vue';
import { util } from "@/core";

// 获取用户登录凭据方法
export const GetAccountToken = () => util.storage("auth")
// 设置用户登录凭据方法(用于清空凭据)
export const SetAccountToken = token => util.storage("auth", token)

// 获取用户权限数据方法
export const GetPermission = () => Vue.$store.action("permission");
// 获取路由权限后回调
export const AfterGetActualRouter = actualRouter => Vue.$store.set("menu", actualRouter[0].children);

