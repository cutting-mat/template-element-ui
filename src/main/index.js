import index from './views/index'

import library from '../__library'
import permission from '../permission'
import user from '../user'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...library,
        ...permission,
        ...user
    ]
}]
