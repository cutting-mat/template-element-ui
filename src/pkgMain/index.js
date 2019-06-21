import index from './views/index'

import package1 from '../pkg1'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...package1
    ]
}]