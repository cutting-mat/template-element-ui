const SriPlugin = require('webpack-subresource-integrity');

// 本地存储命名空间，多个前端项目设置同一个值可以实现单点登录
process.env.VUE_APP_STORAGE_SPACE = '';

// 权限控制
process.env.VUE_APP_AUTH = false;

module.exports = {
    transpileDependencies: [],  // 需要babel编译的依赖包名
    css: {
        sourceMap: true         // 开启css map
    },
    productionSourceMap: false, // 生产环境关闭map
    configureWebpack: {
        output: {
            crossOriginLoading: 'anonymous',
        },
        plugins: [
            new SriPlugin({
                hashFuncNames: ['sha256', 'sha384'],
                enabled: process.env.NODE_ENV === 'production'  // 生产环境开启子资源完整性（SRI）配置
            })
        ],
    },
    outputDir: 'docs',   // 构建目录，默认'dist'
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'      // 根路径，需要配置服务器转发
}