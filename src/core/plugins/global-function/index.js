/**
 * Vue全局功能注册
 * 输出：
 * 注册用户配置（@/plugin.global-function.config）的全局资源
 * */

// 全局资源配置
import {
  components,
  filters,
  directives,
  $methods,
  methods,
} from "@/plugin.global-function.config";

export { default as install } from "./assets/register";

export const config = {
  components,
  filters,
  directives: Object.assign(
    {
      auth: {
        // 空v-auth指令，避免不开启权限控制时报错
      },
    },
    directives
  ),
  $methods,
  methods,
};
