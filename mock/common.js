// 自定义 mock 接口
export default [
    {
        url: '/test',
        type: 'get',
        response: config => {

            return {
                data: 'test',
                msg: 'ok'
            }
        }
    },
]
