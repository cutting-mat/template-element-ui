// import components
import HelloWorld from "./components/HelloWorld"

// import filters
import {formatDate} from './assets/util'

// filters
const globalFilters = {
    formatDate
}

// components
const globalComponents = {
    HelloWorld
}

export default {
    install: function(Vue) {
        // 全局过滤器
        Object.keys(globalFilters).forEach(key => {
            Vue.filter(key, globalFilters[key])
        })

        // 全局组件
        Object.keys(globalComponents).forEach(key => {
            Vue.component(key, globalComponents[key])
        })

    }
}