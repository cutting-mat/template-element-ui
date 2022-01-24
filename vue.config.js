const SriPlugin = require('webpack-subresource-integrity');

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
                hashFuncNames: ['sha384'],
                enabled: process.env.NODE_ENV === 'production'  // 生产环境开启子资源完整性（SRI）配置
            })
        ],
    },
    outputDir: 'docs',                                          // 构建目录，默认'dist'
    publicPath: process.env.NODE_ENV === 'production'           
    ? '/template-element-ui/'                                                       // 构建路径，默认'/'
    : '/'      
}