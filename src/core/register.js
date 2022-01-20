// 全局组件
import Header from '@/main/components/Header.vue'

const globalComponents = {
    Header,
    Breadcrumb: () => import(/* webpackChunkName: "global-components" */ "@/main/components/Breadcrumb.vue"),
    SubNav: () => import(/* webpackChunkName: "global-components" */ "@/main/components/SubNav.vue"),
    Pagination: () => import(/* webpackChunkName: "global-components" */ "@/main/components/Pagination.vue"),
    BaseCURD:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/BaseCURD.vue"),
    DictRadio:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictRadio.vue"),
    DictCheckbox:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictCheckbox.vue"),
    DictSelect:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictSelect.vue"),
    DictCascader:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictCascader.vue"),
    OrgPicker:  (resolve) => require(["@/system/components/OrgPicker.vue"], resolve),
    TheResourcePicker:  (resolve) => require(["@/system/components/TheResourcePicker.vue"], resolve),
    
}

// 全局过滤器
import { util } from '@/core'

const globalFilters = {
    date: util.formatDate
}

export default {
    install: function (Vue) {
        // 注册过滤器
        Object.keys(globalFilters).forEach(key => {
            Vue.filter(key, globalFilters[key])
        })

        // 注册组件
        Object.keys(globalComponents).forEach(key => {
            Vue.component(key, globalComponents[key])
        })

        // v-auth 指令（用于权限控制）
        Vue.directive('auth', {
            inserted: function (el, binding) {
                if (Vue.prototype.$_auth && !Vue.prototype.$_auth(binding.value)) {
                    el.parentNode.removeChild(el);
                }
            }
        });

    }
}