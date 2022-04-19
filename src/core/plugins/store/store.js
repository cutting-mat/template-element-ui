/**
 * Store Vue状态管理插件
 * Store.set(key, value)
 * Store.get(key)
 * Store.action(key).then().catch()
 * */

// Vue2版
import Vue from "vue";

const store = {
    state: {},
    actions: {},
    inStore(key) {
        return this.state[key] !== void (0)
    },
    set(key, newValue) {
        return new Promise((resolve, reject) => {
            if (this.inStore(key)) {
                this.state[key] = newValue;
                resolve(newValue)
            } else {
                reject(`[Store] set("${key}", value): the key has not registered yet!`)
            }
        })
    },
    get(key) {
        if (key && key.split) {
            if (this.inStore(key)) {
                return this.state[key]
            } else {
                return new Error(`[Store] get("${key}"): the key has not registered yet!`)
            }
        }
    },
    action(key, payoud) {
        return new Promise((resolve, reject) => {
            if (typeof this.actions[key] === 'function') {
                const actionReturn = this.actions[key]({
                    get: this.get.bind(store),
                    set: this.set.bind(store)
                }, payoud);

                if (actionReturn && (typeof actionReturn.then === 'function')) {
                    // action 返回 Promise
                    actionReturn.then(data => {
                        if (this.inStore(key)) {
                            // action 有同名 state ，触发自动模式
                            this.set(key, data)
                        }
                        resolve(data)
                    }).catch(reject)
                } else {
                    resolve(actionReturn)
                }
            } else {
                reject(`[Store] action("${key}", ${payoud}): the action has not registered yet!`)
            }
        })
    }
}

// watch queue
let watchQueue = {}
const vm = new Vue();

export default function installer(app, options) {
    if (app && options === void (0)) {
        if (app.state || app.actions) {
            options = app;
            app = null;
        } else {
            app = null;
            console.warn('[Store] options format error')
        }
    }

    if (options) {
        // 合并 state
        let optionState = options.state || {}
        if (typeof optionState === 'function') {
            optionState = optionState() || {}
        }

        const mergeState = Object.assign({}, store.state, optionState)
        store.state = Vue.observable(mergeState)
        // 监听
        Object.keys(mergeState).forEach(key => {
            if (typeof watchQueue[key] === 'function') {
                watchQueue[key]()
            }
            watchQueue[key] = vm.$watch(
                () => store.state[key],
                (value) => {
                    console.log('[Store] update:', key, '=>', value)
                }
            )
        })

        // 合并 action
        Object.assign(store.actions, options.actions || {})
    }

    if (app) {
        app.prototype.$store = store

        app.mixin({
            data() {
                return {
                    $state: store.state
                }
            }
        })
    }

    return store
}

export const plugin = {
    install: installer
}