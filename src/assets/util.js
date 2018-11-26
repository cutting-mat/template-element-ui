/* eslint-disable */
import Vue from 'vue'
//localStorage
export const storage = function(key, value) {
  if (value === void(0)) {
      let lsVal = localStorage.getItem(key);
      if (lsVal && lsVal.indexOf('autostringify-') === 0) {
          return JSON.parse(lsVal.split('autostringify-')[1]);
      } else {
          return lsVal;
      }
  } else {
      if (typeof(value) === "object" || Array.isArray(value)) {
          value = 'autostringify-' + JSON.stringify(value);
      };
      return localStorage.setItem(key, value);
  }
}
//生成随机数
export const getUUID = function (len) {
  len = len || 6;
  len = parseInt(len, 10);
  len = isNaN(len) ? 6 : len;
  var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
  var seedLen = seed.length - 1;
  var uuid = "";
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)];
  }
  return uuid;
};
//深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};

//日期格式化
export const dateFormat = function(source, ignore_minute) {
  const separate = '-';
  if (!source) {
      source = new Date();
  }

  if (!isNaN(parseInt(source))) {
      //时间戳（秒）
      source = source * 1000
  } else if (source.split) {
      //字符串过滤'-'
      source = source.replace(/\-/g, '/');
  }

  if (new Date(source) && (new Date(source)).getDate) {
      let myDate = new Date(source);
      let minute = '';
      if (!ignore_minute) {
          minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
      }
      return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
  } else {
      return source.slice(0, 16);
  }

};
//ajax错误处理
export const catchError = function (error) {
  //业务代码拦截
  if(error.data){
      error.response = error.data
  }
  //原生错误对象
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.statusCode || '请求参数异常',
          type: 'error'
        });
        break;
      case 401:
        sessionStorage.removeItem('user');
        Vue.prototype.$message({
          message: error.response.statusCode || '密码错误或账号不存在！',
          type: 'warning',
          onClose: function () {
            storage('user','');
            location.reload();
          }
        });
        break;
      case 403:
        Vue.prototype.$message({
          message: error.response.statusCode || '无访问权限，请联系企业管理员',
          type: 'warning'
        });
        break;
      default:
        Vue.prototype.$message({
          message: error.response.statusCode || '服务端异常，请联系技术支持',
          type: 'error'
        });
    }
  } else if (error.message) {
  	let message = error.message;
    if(message.indexOf('timeout')>-1){
      message = '请求超时，请重试'
    }
    if(message.indexOf('Network')>-1){
      message = '网络异常'
    }
    Vue.prototype.$message({
      message,
      type: 'error'
    });
    
  }
  return Promise.reject(error);
}

let bus = new Vue();
//监听事件
export const on = function (eventName, eventHandle) {
  if (eventName && (typeof eventHandle === 'function'))
    return bus.$on(eventName, eventHandle)
};
//触发事件
export const emit = function (eventName, msg) {
  return bus.$emit(eventName, msg)
};
