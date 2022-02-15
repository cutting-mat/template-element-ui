/**
 * 模块配置文件
 * 必须输出 mainModule[Router Array] 和 subModules[Router Array]
 * 主模块的首页('/')为主模板，所有子模块路由挂载为主页子路由，受`account-auth`和`access-control`模块控制
 * 主模块的其余页面(如'/public')，不受主模板('/')限制，且不受任何访问限制
 * */ 

// 主模块
import main from '@/main/index'

export const mainModule = [
    ...main,
] 
// 子模块
import system from '@/system'
import user from '@/user'

export const subModules =  [
    ...system,
    ...user,
]
