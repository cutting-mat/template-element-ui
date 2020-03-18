import Vue from 'vue'
const bus = new Vue();

// 队列容器
let promiseQueue = {};


export const store = {
    debug: true,
    state: {
        accessToken: null, // token
        menu: [], // 导航菜单
        user: {}, // 用户信息
        isCollapse: false, // 菜单收起状态 
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
        return new Promise((resolve, reject) => {
            if (this.state[key] !== void(0)) {
                resolve(this.state[key])
            } else {
                reject(`key [${key}] is not register in store!`)
            }

        })
    },
    checkStore(key, type) {
        let result;
        type = type || 'array'; // array,object,number,string,boolean
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
    action(key, type) {
        return new Promise((resolve, reject) => {
            // 异步数据处理方法
            const catchActionData = (data) => {
                this.set(key, data)
                resolve(data)
                delete promiseQueue[key];
            }
            if (this.checkStore(key, type)) {
                resolve(this.state[key])
            } else {
                // 检测并加入队列
                if(promiseQueue[key]){
                    bus.$once(promiseQueue[key], (msg) => {
                        catchActionData(msg)
                    })
                }else{
                    // 创建队列
                    promiseQueue[key] = 'action_' + parseInt(Math.random() * 1e8);
                    // 定义异步数据获取逻辑
                    switch (key) {
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
