// import axios from 'axios';
import axios from "@cutting-mat/axios";
import { event, routeGenerator } from "@/core";
import { default as requestConfig, CryptoConfig } from "@/request.config";
import { Message } from "element-ui";

console.log(
  `[Core] Request Start. Encryption: ${
    CryptoConfig.Enable ? "Enabled" : "Disabled"
  }`
);

// 创建请求实例
const instance = axios.create(requestConfig);

// 判断是否开启请求加密
const needCrypto = function (config) {
  return (
    CryptoConfig.Enable && CryptoConfig.WhiteList.indexOf(config.url) === -1
  );
};

// 请求前处理
instance.interceptors.request.use(
  async function (config) {
    if (config.method === "get" || config.method === "delete") {
      // 过滤get和delete请求中的空字符参数
      for (let x in config.params) {
        if (config.params[x] === "") {
          config.params[x] = null;
          console.log(
            `[${config.method} ${config.url}]参数[${x}]由''重置为null`
          );
        }
      }
    }
    // 如果没有开启请求控制，则删除相关自定义头，否则需要服务端设置 Access-Control-Allow-Headers
    let permissionConfig = await import("@/plugin.permission.config.js");
    permissionConfig = permissionConfig.default;
    if (
      !(
        permissionConfig &&
        permissionConfig.AccessControl &&
        permissionConfig.interceptorsRequest
      )
    ) {
      delete config.headers["X-Request-Permission"];
    }
    // 请求加密
    if (needCrypto(config)) {
      const SecretKey = CryptoConfig.GetSecretKey(config);
      if (SecretKey) {
        const encData = CryptoConfig.EncryptData(config, SecretKey);
        // 发送加密请求
        config.url = CryptoConfig.GetCryptoUrl(config);
        config.method = "post";
        config.data = { data: encData };
        config.params = {};
        return config;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应后处理
instance.interceptors.response.use(
  function (response) {
    // 请求解密
    if (needCrypto(response.config)) {
      const SecretKey = CryptoConfig.GetSecretKey(response.config);
      if (SecretKey) {
        const reqData = CryptoConfig.DecryptData(
          JSON.parse(response.config.data).data,
          SecretKey
        );
        CryptoConfig.Debug && console.log("请求>>>>", reqData);
        response.data = JSON.parse(
          CryptoConfig.DecryptData(response.data, SecretKey)
        );
        CryptoConfig.Debug && console.log("响应<<<<<", response);
      }
    }

    // token临近过期, 重新签发token
    if (response.headers["jwt-update-token"]) {
      event.emit("login", {
        updateToken: true,
        data: {
          accessToken: response.headers["jwt-update-token"],
        },
      });
    }

    // 控制台输出接口返回
    if (window.DebugRequest) {
      console.log(
        response.request.custom.options.type,
        response.request.custom.options.url,
        " => ",
        response.data
      );
    }

    // (兼容response.data.code格式)
    if (response.data.code === 500) {
      return catchError({ response });
    }
    if (response.data.data) {
      response.data = response.data.data;
    }
    return response;
  },
  function (error) {
    return catchError(error);
  }
);

/**
 * 请求错误处理
 * @param error[axios正常或异常返回数据] 所有服务器捕获的错误, 约定返回数据中用msg字段携带错误信息;
 * @return 401状态码会触发登出操作, 其他异常状态码只做提醒
 */
const catchError = function (error) {
  // 路由实例
  let Router = routeGenerator();
  //原生错误对象
  if (error.response) {
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 400:
        Message({
          message: getStringFromData(error.response.data, "请求参数异常"),
          type: "error",
        });
        break;
      case 401:
        Message({
          message: getStringFromData(error.response.data, "未授权或授权已过期"),
          type: "warning",
          onClose: function () {
            event.emit("logout");
          },
        });
        break;
      case 403:
        Message({
          message: getStringFromData(
            error.response.data,
            "无访问权限, 请联系企业管理员"
          ),
          type: "warning",
        });
        break;
      default:
        Router.replace({
          name: "服务异常",
          query: {
            message: getStringFromData(error.response.data, "服务异常"),
          },
        });
    }
  } else if (error.message) {
    // Something happened in setting up the request that triggered an Error
    let message = error.message;
    if (message.indexOf("timeout") > -1) {
      message = "请求超时, 请重试";
      Message({
        message,
        type: "error",
      });
    } else if (message.indexOf("Network") > -1) {
      message = "网络异常";
      Message({
        message,
        type: "error",
      });
    } else if (message.indexOf("canceled") > -1) {
      // 请求取消
    } else {
      Router.replace({
        name: "服务异常",
        query: {
          message,
        },
      });
    }
  }

  return Promise.reject(error);
};
// 获取错误信息
const getStringFromData = function (data, placeholder) {
  if (typeof data === "object" && data.msg) {
    return data.msg;
  }
  return data && data.split ? data : placeholder;
};

export default instance;
