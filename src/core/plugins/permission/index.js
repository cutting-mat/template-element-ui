/**
 * 权限模块
 * 输出：
 * 用户鉴权 => 实例方法 this.$Permission，用户登录后回调
 * 用户鉴权 => 全局事件 login，用户登录触发
 * 用户鉴权 => 全局事件 logout，用户登出触发
 * 用户鉴权 => 路由守卫
 * 用户鉴权 => 设置公共请求头 Authorization
 * 用户鉴权 => Token 自动续期
 * 权限控制 => 实例方法 this.$_auth
 * 权限控制 => 全局指令 v-auth
 * */ 

export { default as install } from "./assets/permission";
export { default as config } from "@/plugin.permission.config";
