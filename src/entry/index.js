import index from './views/index'

import package1 from '../package1'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...package1
    ]
}]