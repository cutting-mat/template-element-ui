/**
 * 全局组件
 * */
import Header from "@/main/components/Header.vue";

export const components = {
  Header,
  Breadcrumb: () => import("@/main/components/Breadcrumb.vue"),
  SubNav: () => import("@/main/components/SubNav.vue"),
  Pagination: () => import("@/main/components/Pagination.vue"),
  ToolBar: () => import("@/main/components/ToolBar.vue"),
  CountDown: () => import("@/core/components/CountDown/CountDown.vue"),
  InputNumber: () => import("@/core/components/InputNumber/InputNumber.vue"),
  InputPassword: () =>
    import("@/core/components/InputPassword/InputPassword.vue"),
};

/**
 * 全局过滤器
 * */
import { formatDate } from "@/core";
export const filters = {
  date: formatDate,
};

/**
 * 全局指令
 * */
export const directives = {
  test: {
    inserted(el) {
      setTimeout(() => {
        el.innerText += " test directive inject!";
      }, 0);
    },
  },
};

/**
 * 实例方法
 * */
import { clipboard } from "@/core";

export const $methods = {
  $clipboard: clipboard,
};

/**
 * 全局方法
 * */

export const methods = {
  Test() {
    return "test globalMethod output!";
  },
};
