const Mock = require('mockjs')
import Vue from 'vue'
Vue.UseMockData = true;
console.log('开启Mock数据')

// schema 转 template
const getValue = function (schemaObject) {
    if (!schemaObject) {
        return {}
    }
    if (schemaObject.split) {
        schemaObject = JSON.parse(schemaObject)
    }
    let result;
    try {
        result = schemaObject.mock ? schemaObject.mock.mock || schemaObject.mock : ''
    } catch (e) {
        console.log(e, schemaObject)
    }

    switch (schemaObject.type) {
        case "object":
            result = objectTransfer(schemaObject.properties)
            break;
        case "array":
            result = [getValue(schemaObject.items)]
            break;
        case "number":
            result = isNaN(Number(result)) ? result : Number(result)
            break;
        default:

    }
    return result
}

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
            result[key] = getValue(object[key.split('|')[0]])
        } else {
            result[key] = getValue(object[key])
        }

    }
    return result;
}

// 手写 mock 脚本
export const runJsMock = function () {
    const jsctx = require.context("./", true, /.+js$/);

    if (jsctx.keys().length) {
        //console.log(jsctx.keys())
        let jsmocks = []

        jsctx.keys().forEach((key) => {
            if (key !== './index.js') {
                jsmocks.push(jsctx(key).default)
            }
        });
        jsmocks = jsmocks.flat()
        console.log('JsMocks:', jsmocks)
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
            return {
                url: e.path,
                type: e.method.toLowerCase(),
                template: getValue(e.res_body)
            }
        })
        console.log('JsonMocks:', jsonmocks)
        for (const mock of jsonmocks) {
            Mock.mock(new RegExp(mock.url), mock.type, mock.template)
        }
    }
}

export default function(){
    runJsMock()
    runJsonMock()
}


// 测试解析yapi导出数据
// const schemaObject = {
//     "$schema": "http://json-schema.org/draft-04/schema#",
//     "type": "object",
//     "properties": {
//         "data": {
//             "type": "array",
//             "items": {
//                 "type": "object",
//                 "properties": {
//                     "id": {
//                         "type": "number",
//                         "mock": {
//                             "mock": "@integer(1,5)"
//                         }
//                     },
//                     "name": {
//                         "type": "string",
//                         "mock": {
//                             "mock": "@cword(1,3)角色"
//                         }
//                     }
//                 },
//                 "required": [
//                     "id",
//                     "name"
//                 ]
//             },
//             "uniqueItems": true,
//             "minItems": 2,
//             "maxItems": 5
//         }
//     },
//     "required": [
//         "data"
//     ]
// }

//console.log('getValue:', getValue(schemaObject))