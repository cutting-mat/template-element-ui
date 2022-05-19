// 验证手机号
export const validMobile = (value) => {
  return /^(?:(?:\+|00)86)?1\d{10}$/.test(String(value));
};
// 验证身份证
export const validId = (value) => {
  return /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
    String(value)
  );
};
// 验证座机号
export const validTel = (value) => {
  return /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(
    String(value)
  );
};
// 验证邮箱
export const validEmail = (value) => {
  return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
    String(value)
  );
};

/**
 * 自定义表单校验方法，兼容 async-validator
 * @param config [Object]:
 * {
 *  required[Boolean]: 是否必填,
 *  value[Any]: 值,
 *  validType[String]: 校验格式, // mobile | idCard | tel | email
 *  label[String]: 字段名，用于生成提示语
 * }
 * */
export const validator = function (config = {}) {
  let inputValue = config.value;
  if (typeof inputValue === "function") {
    inputValue = inputValue();
  }
  if (!config.label) {
    config.label =
      {
        mobile: "手机号",
        idCard: "身份证号",
        tel: "电话",
        email: "邮箱",
      }[config.validType] || "";
  }
  return new Promise((resolve, reject) => {
    if (inputValue === undefined || inputValue === null || !inputValue.length) {
      if (config.required) {
        return reject(`请输入${config.label}`);
      } else {
        return resolve();
      }
    }

    switch (config.validType) {
      case "mobile":
        validMobile(inputValue)
          ? resolve()
          : reject(`${config.label}格式有误，请重新输入`);
        break;
      case "idCard":
        validId(inputValue)
          ? resolve()
          : reject(`${config.label}格式有误，请重新输入`);
        break;
      case "tel":
        validTel(inputValue)
          ? resolve()
          : reject(`${config.label}格式有误，请重新输入`);
        break;
      case "email":
        validEmail(inputValue)
          ? resolve()
          : reject(`${config.label}格式有误，请重新输入`);
        break;
      default:
        reject(`不支持的validType: ${config.validType}`);
    }
  });
};
