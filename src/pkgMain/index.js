import index from './views/index'

import system from '../system'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...system
    ]
}]