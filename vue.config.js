const SriPlugin = require('webpack-subresource-integrity');

/**
 * cutting-mat配置
 * */ 
process.env.VUE_APP_STORAGE_SPACE = '';                         // 用于util.storage()的本地存储命名空间

/**
 * vue-cli配置
 * */ 
module.exports = {
    transpileDependencies: [],                                  // 需要babel编译的依赖包名
    css: {
        sourceMap: true                                         // 开启css map
    },
    productionSourceMap: false,                                 // 生产环境关闭map
    configureWebpack: {
        entry: './src/core/main.js',                            // 更改入口文件位置
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
    outputDir: 'docs',                                          // 构建目录，默认'dist'
    publicPath: process.env.NODE_ENV === 'production'           // 网址根路径，需要配置服务器转发
    ? '/template-element-ui/'
    : '/'      
}