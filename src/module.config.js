/**
 * 模块配置文件
 * 约定1： 该文件必须输出 主模块(mainModule) 和 子模块(subModules) ，格式均为 [Router Array]
 * 约定2： 主模块数组的第一个对象必须是首页('/')路由
 * 约定3： 子模块的路由将自动挂载为首页('/')的子路由；主模块除首页外的其余路由(如'/login')为旁路路由，不受访问限制(account-auth、access-control)
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
