import index from './views/index'

import blank from '../__template'
import permission from '../permission'
import user from '../user'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...blank,
        ...permission,
        ...user
    ]
}]
