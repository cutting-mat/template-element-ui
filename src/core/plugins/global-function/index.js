/**
 * Vue全局功能注册
 * 输出：
 * 注册框架内置全局资源
 * 注册用户配置（@/plugin.global-function.config）的全局资源
 * */


export { default as install } from "./assets/register";

// 内置组件 
import coreComponents from "@/core/components";

// 内置过滤器：日期格式化
import { formatDate } from '@/core/util'

// 内置实例方法：剪切板
import clipboard from "@/core/util/clipboard";

// 用户配置全局资源
import { components, filters, directives, $methods, methods } from "@/plugin.global-function.config";
export const config = {
    components: Object.assign(coreComponents, components),
    filters: Object.assign({
        date: formatDate
    }, filters),
    directives: Object.assign({
        'auth': {
            // 空v-auth指令，避免不开启权限控制时报错
        },
    }, directives),
    $methods: Object.assign({
        $clipboard: clipboard,
    }, $methods),
    methods: Object.assign({}, methods)
}
