/**
 * Mock数据
 * 同目录*.js文件将视为定义接口文件，将尝试注册为Mock接口
 * 同目录*.json文件将视为YAPI导出的json数据，将自动解析并注册为Mock接口
 * */

window.DebugRequest = true;
console.log(`[Mock] Start. Please make sure that main.js => AccessControl is closed, otherwise it will not work properly`)

const Mock = require('mockjs')
Mock.setup({
    timeout: '100-600'
})

/**
 * 获取url中的query值
 * @param keyName[String] 要获取的参数名
 * @param url[String] 目标url, 默认当前窗口url
 * @return keyName参数的值
*/
export const getUrlParam = function (keyName, url) {
    if (keyName && keyName.split) {
        let urlParamReg = new RegExp("(^|&)" + keyName + "=([^&#/]*)", "i");
        let s = (url ? url : window.location.href).split('?')[1] || '';
        let r = s.match(urlParamReg);
        if (r !== null) {
            return decodeURI(r[2]);
        }
    }

    return null;
};

// resbody 转 template
const getTemplate = function (schemaObject) {
    if (!schemaObject) {
        return {}
    }
    if (schemaObject.split) {
        schemaObject = JSON.parse(schemaObject)
    }
    let result;
    // 基础类型
    try {
        result = schemaObject.mock ? schemaObject.mock.mock || schemaObject.mock : ''
    } catch (e) {
        console.warn(e, schemaObject)
    }
    // 复杂类型
    switch (schemaObject.type) {
        case "object":
            result = objectTransfer(schemaObject.properties)
            break;
        case "array":
            result = [getTemplate(schemaObject.items)]
            break;
        case "number":
            result = isNaN(Number(result)) ? result : Number(result)
            break;
        default:

    }
    return result
}

// object 转 template
const objectTransfer = function (object) {
    let keys = Object.keys(object).map(key => {
        if (object[key].type === "array") {
            return `${key}|${object[key].minItems}-${object[key].maxItems}`
        }
        return key
    })
    let result = {}
    for (const key of keys) {
        if (key.indexOf('|') !== -1) {
            result[key] = getTemplate(object[key.split('|')[0]])
        } else {
            result[key] = getTemplate(object[key])
        }

    }
    return result;
}

// template 转 function
const tFunction = function (templateObject) {
    return function (option) {
        let templateStr = JSON.stringify(templateObject)
        const match = templateStr.match(/\$\{([^.]+)\.([^.}]+)\}/g);
        if (match && match.length) {
            match.forEach(matchStr => {
                let result = ''
                const match2 = matchStr.match(/\$\{([^.]+)\.([^.}]+)\}/);
                if (match2) {
                    const dataFrom = match2[1];
                    const dataKey = match2[2];
                    if (dataFrom === 'query') {
                        result = getUrlParam(dataKey, option.url)
                    } else if (dataFrom === 'body') {
                        try {
                            result = JSON.parse(option.body)[dataKey]
                        } catch (e) {
                            result = getUrlParam(dataKey, option.body)
                            console.warn(`tFunction解析错误`, e)
                        }

                    } else {
                        console.warn(`tFunction解析错误：${option.url}, ${match[0]}`)
                    }
                }
                templateStr = templateStr.replace(matchStr, result)
            })

        }
        return Mock.mock(JSON.parse(templateStr));
    }
}

// 手写 mock 脚本
export const runJsMock = function () {
    const jsctx = require.context("./", true, /.+js$/);

    if (jsctx.keys().length) {
        //console.log(jsctx.keys())
        let jsmocks = []

        jsctx.keys().forEach((key) => {
            if (key !== './index.js' && Array.isArray(jsctx(key).default)) {
                jsmocks.push(jsctx(key).default)
            }
        });
        jsmocks = jsmocks.flat()
        console.log('[Mock] Requests from ./*.js:', jsmocks)
        for (const mock of jsmocks) {
            Mock.mock(new RegExp(mock.url), mock.type || 'get', mock.response)
        }
    }
}


// yapi 导出 mock 数据
export const runJsonMock = function () {
    const jsonctx = require.context("./", true, /.+json$/);
    if (jsonctx.keys().length) {
        //console.log(jsonctx.keys())
        let jsonmocks = []

        jsonctx.keys().forEach((key) => {
            if (key !== './index.js') {
                jsonmocks.push(jsonctx(key))
            }
        });

        jsonmocks = jsonmocks.flat().flatMap(json => json.list).map(e => {
            let resBody = e.res_body;
            try {
                if (resBody.split) {
                    resBody = e.res_body ? JSON.parse(e.res_body) : ""
                }
            } catch (err) {
                console.warn(e.path, e.res_body, err)
            }
            const template = (resBody.$schema || resBody.mock || (resBody.type && resBody.properties) || (resBody.type && resBody.uniqueItems)) ? getTemplate(e.res_body) : resBody
            return {
                url: e.path,
                type: e.method.toLowerCase(),
                function: tFunction(template)
            }
        })
        console.log('[Mock] Requests from ./*.json:', jsonmocks)
        for (const mock of jsonmocks) {
            Mock.mock(new RegExp(mock.url), mock.type, mock.function)
        }
    }
}

export default function () {
    runJsMock()
    runJsonMock()
}
