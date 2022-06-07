import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

// 加载全局样式
import "@/core/assets/global.css";

// 预安装插件
export default {
  install: function (Vue, opts = {}) {
    // 安装ElementUI
    Vue.use(ElementUI);
  },
};
