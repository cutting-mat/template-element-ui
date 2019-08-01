// 全局组件
import globalHeader from "@/common/components/header.vue"
const globalNav = () => import(/* webpackChunkName: "global-components" */ "@/common/components/nav.vue")
const globalTagManage = () => import(/* webpackChunkName: "global-components" */ "@/common/components/tagManage.vue")

const globalComponents = {
    globalHeader,
    globalNav,
    globalTagManage
}

// 全局过滤器
import {formatDate} from '@/common/assets/util'

const globalFilters = {
    date: formatDate
}

export default {
    install: function(Vue) {
        // 注册过滤器
        Object.keys(globalFilters).forEach(key => {
            Vue.filter(key, globalFilters[key])
        })

        // 注册组件
        Object.keys(globalComponents).forEach(key => {
            Vue.component(key, globalComponents[key])
        })

    }
}