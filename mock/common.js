// 自定义 mock 接口
export default [
    {
        url: '/test',
        type: 'get',
        response: config => {

            return {
                url: config.url,
                data: 'test',
                msg: 'ok'
            }
        }
    },
]
