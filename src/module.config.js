/**
 * 模块配置文件
 * 约定1： 必须输出 mainModule[Router Array] 和 subModules[Router Array]
 * 约定2： mainModule 的第一个对象是首页('/')路由，所有子模块将注册为首页的子路由
 * 约定3： 首页及其子路由受`account-auth`和`access-control`模块控制，mainModule 的其余路由(如'/login')不受访问限制
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
