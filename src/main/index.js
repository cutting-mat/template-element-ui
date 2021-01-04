import index from './views/Index'

import library from '../__library'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...library,
    ]
}]
