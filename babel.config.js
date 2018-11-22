module.exports = {
  presets: [
    '@vue/app'
  ]
//   根据package.json [browserslist]配置加载polyfill，需同时打开main.js首行注释
// presets: [
//     [
//         '@vue/app',
//         {
//             useBuiltIns: 'entry'
//         }
//     ]
// ]
}