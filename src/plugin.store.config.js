/**
 * store 配置文件
 *
 * */

// api
import { permission } from "@/main/api/common";
import { profile } from "@/system/api/personal";

export default {
  state: () => ({
    testValue: 0, // 仅用于测试
    accessToken: null, // token
    permission: [], // 用户权限
    DynamicRoute: [], // 动态路由
    user: {}, // 用户信息
  }),
  actions: {
    testAction() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.testValue++;
          resolve(this.testValue);
        }, 500);
      });
    },
    getPermission(payload) {
      return permission(
        null,
        Object.assign(
          {
            cache: true,
          },
          payload || {}
        )
      ).then((res) => {
        this.permission = {
          menus: res.data.filter((e) => e.type === 0),
          resources: res.data.filter((e) => e.type === 1),
        };
        return this.permission;
      });
    },
    getUser(payload) {
      return profile(
        null,
        Object.assign(
          {
            cache: true,
          },
          payload || {}
        )
      ).then((res) => {
        this.user = res.data;
        return this.user;
      });
    },
  },
};
