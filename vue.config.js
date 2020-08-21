const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
    // 需要编译的依赖包名
    transpileDependencies: [],

    productionSourceMap: false,

    css: {
        sourceMap: true
    },
    configureWebpack: {
        output: {
            crossOriginLoading: 'anonymous',
        },
        plugins: [
            new SriPlugin({
                hashFuncNames: ['sha256', 'sha384'],
                enabled: true
            })
        ],
    }
}