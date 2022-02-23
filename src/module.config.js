/**
 * 路由模块配置文件
 * 约定1： 该文件必须输出 主模块(mainModule) 和 子模块(subModules) ，格式均为 [Router Array]
 * 约定2： mainModule 数组的第一个对象必须是首页('/')路由
 * 约定3： 子模块路由将自动挂载为首页的子路由，组成主分支；mainModule 除首页外的其余路由(如'/login')为旁路分支
 * 约定4： 主分支的可访问性受账号鉴权(account-auth)和权限控制(access-control)影响， 旁路分支不受访问限制
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
