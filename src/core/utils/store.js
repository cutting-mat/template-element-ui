/**
 * Store 简单 Store 模式
 * Store.set(key, value)
 * Store.get(key)
 * Store.action(key).then().catch()
 * */

export const store = {
    state: {},
    actions: {},
    set(key, newValue) {
        return new Promise((resolve, reject) => {
            if (this.state[key] === void (0)) {
                reject(`this.$store.set("${key}", value): key has not registered yet!`)
            } else {
                this.state[key] = newValue;
                console.log('store update:', key, '=>', this.state[key])
                resolve(true)
            }
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
                if (typeof this.actions[key] === 'function') {
                    this.actions[key]().then(catchActionData)
                } else {
                    reject(`this.$store.action("${key}", ${reload}): action has not registered yet!`)
                }

            }
        })
    }
}

export default {
    install: function (Vue, options) {
        store.state = options.state || {}
        store.actions = options.actions || {}
        Vue.prototype.$store = store
    }
}