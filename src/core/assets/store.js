import * as userApi from "@/user/api/user";

const store = {
    state: {
        accessToken: null, // token
        menu: [], // 导航菜单
        user: {}, // 用户信息
        permission: [] // 用户权限
    },
    set(key, newValue) {
        return new Promise((resolve) => {
            if (this.state[key] === void (0)) {
                console.warn(`store.set("${key}", value): key has not registered yet!`)
            }
            this.state[key] = newValue;
            console.log('store update:', key, '=>', this.state[key])
            resolve(true)
        })
    },
    get(key) {
        if (key && key.split) {
            return this.state[key]
        }
    },
    checkStore(key) {
        let result;
        let type = typeof (this.state[key]); // array,object,number,string,boolean
        if (Array.isArray(this.state[key])) {
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
                this.set(key, data)
                resolve(data)
            }
            if (!reload && this.checkStore(key)) {
                // 缓存命中直接返回结果
                resolve(this.state[key])
            } else {
                switch (key) {
                    case "permission":
                        userApi.permission(null, {
                            cache: !reload
                        }).then(res => {
                            let userPermissions = {
                                menus: res.data.data.filter((e) => e.type === 0),
                                resources: res.data.data.filter((e) => e.type === 1),
                            };
                            catchActionData(userPermissions)
                        })
                        break;
                    case "user":
                        userApi.info(null, {
                            cache: !reload
                        }).then(res => {
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
                        reject(`store.action("${key}", ${reload}): action has not registered yet!`)
                }
            }
        })
    }
}

export default store