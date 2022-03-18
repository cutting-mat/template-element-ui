// 搜索vue组件（排除以'__'开头）
export default require.context("./", true, /^\.\/[^__]+\.vue/);
