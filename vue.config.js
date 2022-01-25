
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
    },
    integrity: process.env.NODE_ENV === 'production',           // 子资源完整性校验（SRI）
    outputDir: 'docs',                                          // 构建目录，默认'dist'
    publicPath: process.env.NODE_ENV === 'production'           
    ? '/template-element-ui/'                                                       // 构建路径，默认'/'
    : '/'      
}