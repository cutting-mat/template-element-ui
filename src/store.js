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
            switch (key) {
                case "someKey":
                    if (this.state[key].length) {
                        resolve(this.state[key])
                    } else {
                        // ajax or do something
                    }
                    break;
                default:
                    if (this.state[key] !== void(0)) {
                        resolve(this.state[key])
                    } else {
                        reject(`this key [${key}] is not register in store!`)
                    }

            }
        })

    }
}