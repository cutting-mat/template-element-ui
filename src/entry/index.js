import index from './views/index'

import routesTemplate from '../pkg-template'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...routesTemplate
    ]
}]