export const store = {
    debug: true,
    state: {
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
    }
}