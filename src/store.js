export const store = {
    debug: true,
    state: {
        tokenInfo: {},          // token携带信息
        menu: [],               // 导航菜单
        user: {},               // 用户信息
        isCollapse: false,      // 菜单收起状态 
        permission: []          // 用户权限
    },
    set(key, newValue) {
        if(this.state[key]!==void(0)){
            this.state[key] = newValue;

            this.debug && console.log('store update:', key, '=>',  this.state[key])
        }else{
            console.warn(`this key [${key}] is not register in store!`)
        }
    },
    get(key) {
        return new Promise((resolve, reject) => {
            switch (key) {
                case "someKey":
                    if (this.state[key].length) {
                        resolve(this.state[key])
                    } else {
                        
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