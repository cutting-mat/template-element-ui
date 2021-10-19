let widStore = {};

export const report = {
    widgetKey: null,
    pageHref: null,
    pageInstanceId: null,
    send: function (packageInfo) {
        if (packageInfo) {
            this.init(packageInfo);

            let widgetAmount = {
                appId: 1,
                timestamp: new Date().getTime(),
                widgetKey: this.widgetKey,
                pageHref: this.pageHref,
                pageInstanceId: this.pageInstanceId
            }

            // 上报
            console.warn('组件上报', widgetAmount)
        }
    },
    init: function (packageInfo) {
        if (packageInfo) {
            this.widgetKey = `${packageInfo.name}__${packageInfo.version}`;
            this.pageHref = window.location.href;
            if (!widStore[this.pageHref]) {
                widStore[this.pageHref] = {}
            }
            if (!widStore[this.pageHref][this.widgetKey]) {
                widStore[this.pageHref][this.widgetKey] = 1;
            }else {
                widStore[this.pageHref][this.widgetKey]++;
            }
            this.pageInstanceId = widStore[this.pageHref][this.widgetKey];
            return this.pageInstanceId;
        }

    }
}