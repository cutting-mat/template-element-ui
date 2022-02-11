import { util, instance } from "@/core";

let routeAuthWhiteList;

export default {
    install: function (Vue) {
        console.log("AccountAuth 开启");

        Vue.setRouterGuards = (routeInstance, mainModule) => {
            // 路由访问免登录白名单
            routeAuthWhiteList = [...mainModule.filter(e => e.path !== '/' && (e.path !== '')).map((e) => e.path)];
            console.log("AccountAuth 免登录路由白名单:", routeAuthWhiteList);
            
            // 获取用户登录状态
            // console.log('获取用户登录状态')
            if (!Vue.$store.get("accessToken")) {
                let localUser = util.storage("auth") || {};
                if (localUser.accessToken) {
                    Vue.$store.set("accessToken", localUser.accessToken);
                }
            }

            routeInstance.beforeEach((to, from, next) => {
                // console.log('路由守卫', to)
                if (!Vue.$store.get("accessToken")) {
                    if (routeAuthWhiteList.indexOf('/' + to.path.split('/')[1]) !== -1) {
                        // 未登录访问白名单
                        return next();
                    } else if (to.path !== "/login") {
                        // 未登录跳转登录页
                        let query = {};
                        query["redirect"] = to.fullPath;
                        return next({
                            path: "/login",
                            query
                        });
                    }
                }

                next()
            })
        }

        Vue.prototype.$AccountAuth = function (config) {
            const conf = Object.assign({
                loginCallback: null
            }, config || {})

            const checkAccount = (loginRes) => {
                if (Vue.$store.get("accessToken")) {
                    // 设置请求头 Authorization
                    instance.defaults.headers.common["Authorization"] = Vue.$store.get("accessToken");

                    // 登录后路由重定向
                    const routeRedirect = () => {
                        if (loginRes && loginRes.redirect) {
                            this.$router.replace({ path: loginRes.redirect });
                        }
                    }

                    if (loginRes && loginRes.silent) {
                        console.log("token已自动续期");
                    } else {
                        if (this.$AccessControl) {
                            this.$AccessControl().then(() => {
                                routeRedirect()
                                typeof conf.loginCallback === 'function' && conf.loginCallback(loginRes)
                            });
                        } else {
                            routeRedirect()
                            typeof conf.loginCallback === 'function' && conf.loginCallback(loginRes)
                        }
                    }

                }
            }
            // global event
            util.on("login", (res) => {
                /*
                 * 监听 "login" 事件
                 */
                util.storage("auth", res.data);
                Vue.$store.set("accessToken", res.data.accessToken);

                checkAccount(res)

            });

            util.on("logout", () => {
                /*
                 * 监听 "logout" 事件
                 */
                util.storage("auth", "");

                if (
                    routeAuthWhiteList.indexOf(
                        "/" + this.$router.currentRoute.path.split("/")[1]
                    ) === -1
                ) {
                    // 非白名单路由刷新, 触发路由守卫的未登录逻辑
                    window.location.reload();
                }
            });

            return checkAccount()
        }
    }
}