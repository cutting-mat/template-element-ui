// 搜索vue组件（排除以'__'开头）
const ctx = require.context("./", true, /^\.\/[^__]+\.vue/);
let components = {};
ctx.keys().forEach((key) => {
    const fileName = key.replace(/^\.\//, "").replace(/\.vue$/, "").replace(/\//g, "-");
    components[fileName] = ctx(key).default
})
//console.log('core components:', components)
export default components;
