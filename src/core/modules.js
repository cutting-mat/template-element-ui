// 业务模块（开启权限控制模式下，业务模块受登录用户权限控制）
import example from '../example'
import system from '../system'
import user from '../user'

export default [
    ...example,
    ...system,
    ...user
]
