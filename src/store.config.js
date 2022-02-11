/**
 * store 配置文件
 * state: {key, value} 定义store里的所有数据
 * state.key[String]: 数据项名称, 未定义的 key 无法存/取操作
 * state.value[Any]: 数据项初始值
 * actions: {key, action} 定义store的自定义操作
 * actions.key[String]: 操作名称, 如果 actions.key 在 state 中已定义, 且 action 函数返回 Promise 对象, 则 Promise 的返回值将自动存入 state[key]
 * actions.action[Function]: 操作方法, 接受 (context, payload) 两个参数
 *    @param context[Object]: 包含 context.get() 和 context.set() 方法, 可以自行操作 state 中的任意数据 
 *    @param payload[Any]: store.action(key, payload) 所传递的参数, 可用于 actions.action 方法的内部逻辑
 *    return [Any]: 返回 Promise 对象是触发自动模式的必要条件(参考 actions.key 的说明), 其他情况无需返回值
 * */
import * as userApi from "@/user/api/user";

export default {
    state: {
        testValue: null,            // 仅用于测试
        accessToken: null,          // token
        menu: [],                   // 导航菜单
        user: {},                   // 用户信息
        permission: []              // 用户权限
    },
    actions: {
        testAction: function(context){
            return new Promise(resolve => {
                setTimeout(() => {
                    context.set('testValue', parseInt(context.get('testValue')+1))
                    resolve()
                }, 500)
            })
        },
        permission: function (context, payload) {
            return userApi.permission(null, Object.assign({
                cache: true
            }, payload || {})).then(res => {
                return {
                    menus: res.data.data.filter((e) => e.type === 0),
                    resources: res.data.data.filter((e) => e.type === 1),
                };
            })
        },
        user: function (context, payload) {
            return userApi.info(null, Object.assign({
                cache: true
            }, payload || {})).then(res => {
                return res.data.data
            })
        }
    }
}