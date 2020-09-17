import Vue from 'vue'
const bus = new Vue();
import * as util from "@/common/assets/util";
import {permission as getUserPermission, info as getUserInfo} from "@/user/api/user";
// 队列容器
let promiseQueue = {};


export const store = {
    debug: process.env.NODE_ENV!=='production',
    state: {
        accessToken: null, // token
        menu: [], // 导航菜单
        user: {}, // 用户信息
        permission: [] // 用户权限
    },
    set(key, newValue) {
        return new Promise((resolve, reject) => {
            if (this.state[key] !== void(0)) {
                this.state[key] = newValue;

                this.debug && console.log('store update:', key, '=>', this.state[key])
                resolve(true)
            } else {
                reject(`this key [${key}] is not register in store!`)
            }
        })
    },
    get(key) {
        if(key && key.split){
            if (this.state[key] === void(0)) {
                util.warn(`key [${key}] is not register in store!`)
            }
            return this.state[key]
        }
    },
    checkStore(key) {
        let result;
        let type = typeof(this.state[key]); // array,object,number,string,boolean
        if(Array.isArray(this.state[key])){
            type = 'array'
        }
        
        switch (type) {
            case 'array':
                result = !!this.state[key].length
                break;
            case 'object':
                result = !!Object.keys(this.state[key]).length
                break;
            default:
                result = !!this.state[key]
        }
        return result
    },
    action(key, reload) {
        return new Promise((resolve, reject) => {
            // 异步数据处理方法
            const catchActionData = (data) => {
                if(promiseQueue[key]){
                    bus.$emit(promiseQueue[key], data)
                    this.set(key, data)
                    resolve(data)
                    delete promiseQueue[key];
                }
            }
            if (!reload && this.checkStore(key)) {
                resolve(this.state[key])
            } else {
                // 检测并加入队列
                if(promiseQueue[key]){
                    bus.$once(promiseQueue[key], (data) => {
                        resolve(data)
                    })
                }else{
                    // 创建队列
                    promiseQueue[key] = 'action_' + parseInt(Math.random() * 1e8);
                    // 定义异步数据获取逻辑
                    switch (key) {
                        case "permission":
                            getUserPermission().then(res => {
                                let userPermissions = {
                                    menus: res.data.data.filter((e) => e.type === 0),
                                    resources: res.data.data.filter((e) => e.type === 1),
                                };
                                catchActionData(userPermissions)
                            })
                            break;
                        case "user":
                            getUserInfo().then(res => {
                                catchActionData(res.data.data)
                            })
                            break;
                        case "someKey":
                            // send ajax and use `catchActionData()` to catch data!
                            
                            // fetchSomeKey().then(res => {
                            //     catchActionData(res.data)
                            // })
                            break;
                        
                        default:
                            reject(`key [${key}] has not define an action!`)
                    }
                }
            }
        })
    }
}

// 控制台查看工具
if(store.debug){
    window.store = {
        list() {
            return JSON.parse(JSON.stringify(store.state))
        }
    }
}
