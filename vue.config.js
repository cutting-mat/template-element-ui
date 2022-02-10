
/**
 * vue-cli配置
 * */ 
module.exports = {
    transpileDependencies: ['@tower1229/axios', '@tower1229/el-upload', '@tower1229/vue-store'],                                  // 需要babel编译的依赖包名
    css: {
        sourceMap: true                                         // 开启css map，方便调试
    },
    productionSourceMap: false,                                 // 生产环境关闭map
    integrity: process.env.NODE_ENV === 'production',           // 子资源完整性校验（SRI）
    outputDir: 'dist',                                          // 构建目录，默认'dist'
    publicPath: process.env.NODE_ENV === 'production'           
    ? '/'                                                       // 生产环境构建路径，默认'/'
    : '/'      
}