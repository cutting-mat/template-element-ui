import Vue from "vue";
/**
 * 预先从全局用户配置中获取props默认值
 * @param key[String] prop的key
 * @param defaultValue[Any] 组件内置默认值
 * return[Any] props.key的最终默认值
 */
export const getDefaultValue = function (key, defaultValue) {
    const globalOption = Vue.$DictControl;
    if (Object.keys(globalOption).indexOf(key) !== -1) {
        return globalOption[key];
    }
    return defaultValue;
};