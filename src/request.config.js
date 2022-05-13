import CryptoJS from "crypto-js";

// 各环境BaseURL配置
const ENVIRONMENT = {
  mock: "http://yapi.sogdata.com/mock/125", // 内网YAPI项目
  dev: "http://retire.kaifa/japi",
  test: "http://test.com/api",
  master: "//master.com/api",
};

// 域名与环境映射关系
const HASH = {
  "dev.com": ENVIRONMENT.dev,
  "test.com": ENVIRONMENT.test,
  "master.com": ENVIRONMENT.master,
};

// Axios 请求实例配置
export default {
  baseURL: HASH[window.location.host] || ENVIRONMENT.mock,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * AES加密方法
 * @param content [String]: 明文
 * @param secretKey [String]: 密钥
 * @return encDataStr [String]: 密文
 * */
const enCrypto = (content, secretKey) => {
  if (secretKey) {
    const salt = CryptoJS.lib.WordArray.random(8);
    const iv = CryptoJS.lib.WordArray.create(
      CryptoJS.SHA256(salt).words.slice(0, 16)
    );
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      iterations: 1,
      keySize: 128 / 32,
    });
    const EncryptData = CryptoJS.AES.encrypt(content, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const encDataStr = CryptoJS.lib.WordArray.create([0x53616c74, 0x65645f5f])
      .concat(salt)
      .concat(EncryptData.ciphertext)
      .toString(CryptoJS.enc.Base64);
    return encDataStr;
  } else {
    console.warn("enCrypto(): 缺少 secretKey");
    return null;
  }
};

/**
 * AES解密方法
 * @param content [String]: 密文
 * @param secretKey [String]: 密钥
 * @return result [String]: 明文
 */
const deCrypto = (content, secretKey) => {
  if (secretKey) {
    const b64 = CryptoJS.enc.Base64.parse(content);
    const salt = CryptoJS.lib.WordArray.create(b64.words.slice(2, 4));
    const iv = CryptoJS.lib.WordArray.create(
      CryptoJS.SHA256(salt).words.slice(0, 16)
    );
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      iterations: 1,
      keySize: 128 / 32,
    });
    const eContent = CryptoJS.lib.WordArray.create(b64.words.slice(4)).toString(
      CryptoJS.enc.Base64
    );
    const result = CryptoJS.AES.decrypt(eContent, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return result;
  } else {
    console.warn("deCrypto(): 缺少 secretKey");
    return null;
  }
};

// 请求加密相关配置
export const CryptoConfig = {
  Enable: false, // process.env.NODE_ENV === 'production', // 加密开关
  Debug: process.env.NODE_ENV === "development", // 调试开关
  GetCryptoUrl: (requestConfig) => {
    // 自定义加密请求地址方法
    return `/sapi/${CryptoJS.MD5(requestConfig.url + "|sogdata.com")}`;
  },
  GetSecretKey: (requestConfig) => {
    // 自定义加解密密钥方法
    const token =
      requestConfig.headers.Authorization ||
      (requestConfig.headers.common &&
        requestConfig.headers.common.Authorization);
    if (token) {
      return token.split(".")[2];
    } else {
      return null;
    }
  },
  EncryptData: function (requestConfig, SecretKey) {
    // 自定义加密方法
    const baseParam = {
      path: `${requestConfig.url}?_ts=${new Date().getTime()}`,
      method: requestConfig.method,
      params: requestConfig.data || requestConfig.params || {},
    };
    return enCrypto(JSON.stringify(baseParam), SecretKey);
  },
  DecryptResponse: function (response, SecretKey) {
    // 自定义解密方法
    if (SecretKey && response.split) {
      const decData = deCrypto(response, SecretKey);
      if (decData) {
        return JSON.parse(decData);
      } else {
        return console.warn(`DecryptResponse(): 解密失败`);
      }
    }
    return response;
  },
  WhiteList: ["/url/disable-crypto"],
};
