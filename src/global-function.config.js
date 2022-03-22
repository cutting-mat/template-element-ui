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
 * 全局指令
 * */ 
const directives = {
    'auth': {
        // 误删，避免不开启权限控制时v-auth指令报错
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
import clipboard from "@/main/assets/clipboard";

const $methods = {
    $clipboard: clipboard,
    $myMethod: function(){
        // 用于测试可删除
        return ('test instance method output!')
    }
}

/**
 * 全局方法
 * */ 
 const methods = {
    globalMethod: function(){
        return ('test globalMethod output!')
    }
}

export default {
    components,
    filters,
    directives,
    $methods,
    methods
}