/**
 * 全局组件
 * */ 
import coreComponents from "@/core/components";
import Header from '@/main/components/Header.vue'

const components = {
    // 框架内置组件
    ...coreComponents,
    // 业务组件
    Header,
    Breadcrumb: () => import("@/main/components/Breadcrumb.vue"),
    SubNav: () => import("@/main/components/SubNav.vue"),
    Pagination: () => import("@/main/components/Pagination.vue"),
    ToolBar: () => import("@/main/components/ToolBar.vue"),
}

/**
 * 全局过滤器
 * */ 
import { util } from '@/core'

const filters = {
    date: util.formatDate
}

/**
 * 全局方法
 * */ 
const methods = {
    globalMethod: function(){
        return ('test globalMethod output!')
    }
}

/**
 * 全局指令
 * */ 
const directives = {
    'auth': {
        // 不开启权限控制时避免v-auth指令报错
    },
    'test': {
        // 用于测试可删除
        inserted (el) {
            setTimeout(() => {
                el.innerText += ' test directive inject!'
            }, 0)
        }
    }
}

/**
 * 实例方法
 * */ 
const $methods = {
    $myMethod: function(){
        // 用于测试可删除
        return ('test instance method output!')
    }
}

export default {
    components,
    filters,
    methods,
    directives,
    $methods
}