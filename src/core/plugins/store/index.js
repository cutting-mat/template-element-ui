/**
 * 状态管理
 * */
import { createPinia, defineStore, PiniaVuePlugin } from "pinia";
import config from "@/plugin.store.config";

export const pinia = createPinia();
const useStore = defineStore("main", config);

export const Store = useStore(pinia);
export const install = function (app) {
  app.use(PiniaVuePlugin);

  app.prototype.$store = Store;
};
