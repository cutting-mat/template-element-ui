// 调试开关
const DEBUG = process.env.NODE_ENV === "development";

const ctx = import.meta.glob("./!(__)*/index.js", { eager: true });

export default {
  install: function (Vue) {
    Object.keys(ctx).forEach((key) => {
      if (ctx[key].install) {
        Vue.use(ctx[key].install, ctx[key].config);
        DEBUG &&
          console.log(
            `[Core] Plugin Load => ${key
              .replace("./", "")
              .replace("/index.js", "")}`
          );
      }
    });
  },
};
