
// 内置组件 
import coreComponents from "@/core/components";

// 过滤器：日期格式化
import { formatDate } from '@/core/util'

// 实例方法：剪切板
import clipboard from "@/core/util/clipboard";


// 注册器
export { default as install } from "./assets/register";

// 配置
import userConfig from "@/global-function.config";
export const config = Object.assign({
    components: coreComponents,
    filters: {
        date: formatDate
    },
    directives: {
        'auth': {
            // 空v-auth指令，避免不开启权限控制时报错
        },
    },
    $methods: {
        $clipboard: clipboard,
    },
    methods: {}
}, userConfig)
