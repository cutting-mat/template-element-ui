import Vue from 'vue';
import { util, instance } from "@/core";

// 获取用户登录凭据方法
export const GetAccountToken = () => util.storage("auth")
// 设置用户登录凭据方法
export const SetAccountToken = token => util.storage("auth", token)

// axios请求权限校验方法
export const setInterceptor = function (resourcePermission) {
    instance.interceptors.request.use((config) => {
        let requestURL = config.url.replace(config.baseURL, "").split("?")[0];

        if (!resourcePermission[config.method + "," + requestURL]) {
            return Promise.reject({
                message: config.method + "," + requestURL + "无访问权限",
            });
        }
        return config;
    });
}
// 获取用户权限数据方法
export const GetPermission = () => Vue.$store.action("permission");
// 获取路由权限后回调
export const AfterGetActualRouter = actualRouter => Vue.$store.set("menu", actualRouter[0].children);

