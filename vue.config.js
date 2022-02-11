/**
 * vue-cli配置
 * */
module.exports = {
    transpileDependencies: ['@cutting-mat/axios', '@cutting-mat/el-upload', '@cutting-mat/vue-store'],                                  // 需要babel编译的依赖包名
    css: {
        sourceMap: true                                         // 开启css map，方便调试
    },
    productionSourceMap: false,                                 // 生产环境关闭map
    integrity: process.env.NODE_ENV === 'production',           // 子资源完整性校验（SRI）
    outputDir: 'dist',                                          // 构建目录，默认'dist'
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'                                                   // 生产环境构建路径，默认'/'
        : '/',
    chainWebpack(config) {
        // 打包分析插件 npm run build --report
        if (process.env.npm_config_report) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            config
                .plugin('Analyzer')
                .use(BundleAnalyzerPlugin);
        }
        // 分包策略
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                }
                            }
                        })
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}