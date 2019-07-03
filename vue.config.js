module.exports = {
    transpileDependencies: [],       // 需要编译的依赖包名
    productionSourceMap: false,
    css: {
        sourceMap: true
    },
    outputDir: 'docs',
    publicPath: process.env.NODE_ENV === 'production'
      ? '/Vue-Scaffold/'
      : '/'
}