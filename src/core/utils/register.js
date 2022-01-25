// 全局组件
import * as resources from "@/vue-global-function"

export default {
    install: function (Vue) {
        // 注册过滤器
        Object.keys(resources.filters).forEach(key => {
            Vue.filter(key, resources.filters[key])
        })

        // 注册组件
        Object.keys(resources.components).forEach(key => {
            Vue.component(key, resources.components[key])
        })

        // 注册全局方法
        Object.keys(resources.methods).forEach(key => {
            Vue[key] = resources.methods[key]
        })

        // 注册指令
        Object.keys(resources.directives).forEach(key => {
            Vue.directive(key, resources.directives[key])
        })

         // 注册实例方法
         Object.keys(resources.$methods).forEach(key => {
            Vue.prototype[key] = resources.$methods[key]
        })
        
    }
}