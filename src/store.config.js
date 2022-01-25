/**
 * store 配置文件
 * state 对象定义 store 中的所有数据，需要设置符合期望数据类型的初始值，否则缓存功能可能异常
 * actions 对象定义 store 中的异步数据（需要先在 state 中定义），异步数据函数需返回一个 Promise 对象，Promise 的返回值将存入对应 state
 * */
import * as userApi from "@/user/api/user";

export default {
    state: {
        test: null,                 // 仅用于测试
        accessToken: null,          // token
        menu: [],                   // 导航菜单
        user: {},                   // 用户信息
        permission: []              // 用户权限
    },
    actions: {
        permission: function (config) {
            return userApi.permission(null, Object.assign({
                cache: true
            }, config || {})).then(res => {
                return {
                    menus: res.data.data.filter((e) => e.type === 0),
                    resources: res.data.data.filter((e) => e.type === 1),
                };
            })
        },
        user: function (config) {
            return userApi.info(null, Object.assign({
                cache: true
            }, config || {})).then(res => {
                return res.data.data
            })
        }

    }
}