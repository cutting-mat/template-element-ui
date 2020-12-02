// 全局组件
import BaseHeader from '@/common/components/BaseHeader.vue'

const globalComponents = {
    BaseHeader,
    BaseNav: () => import(/* webpackChunkName: "global-components" */ "@/common/components/BaseNav.vue"),
    BaseTagManage: () => import(/* webpackChunkName: "global-components" */ "@/common/components/BaseTagManage.vue"),
    BasePagination: () => import(/* webpackChunkName: "global-components" */ "@/common/components/BasePagination.vue"),
    BasePlaceholder: () => import(/* webpackChunkName: "global-components" */ "@/common/components/BasePlaceholder.vue")
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