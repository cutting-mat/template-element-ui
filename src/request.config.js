
// 各环境baseURL配置
const ENVIRONMENT = {
    mock: 'http://rap2api.taobao.org/app/mock/223572',
    dev: 'http://retire.kaifa/japi',
    test: 'http://test.com/api',
    master: '//master.com/api'
};

// 域名与环境映射关系
const HASH = {
    "dev.com": ENVIRONMENT.dev,
    "test.com": ENVIRONMENT.test,
    "master.com": ENVIRONMENT.master
}

// axios 请求实例配置
export default {
    baseURL: HASH[window.location.host] || ENVIRONMENT.dev,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
}