import index from './views/index'

import system from '../system'
import pkgTemplate from '../pkgTemplate'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...pkgTemplate,
        ...system
    ]
}]