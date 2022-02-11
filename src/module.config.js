/**
 * 模块配置文件
 * 必须输出 mainModule[Router Array] 和 subModules[Router Array]
 * 主模块的首页('/')及所有子模块路由受`account-auth`和`access-control`模块控制
 * 主模块的其余页面(如'/public')为公开页面，不受任何访问限制
 * */ 

// 主模块
export { default as mainModule } from '@/main/index'

// 子模块
import system from '@/system'
import user from '@/user'

export const subModules =  [
    ...system,
    ...user,
]
