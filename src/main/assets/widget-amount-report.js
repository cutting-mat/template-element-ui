let widgetAmount = {}

export const report = function(packageInfo) {
    if (packageInfo) {
        const widgetKey = `${packageInfo.name}__${packageInfo.version}`;
        let routeAmount = widgetAmount[widgetKey] || [];
        routeAmount.push(this.$route.fullPath)
        widgetAmount[widgetKey] = [...new Set(routeAmount)];
        // 上报
        // {widgetKey: [path, ...], ...}
        console.warn('组件上报', {
            appId: 1,
            timestamp: new Date().getTime(),
            amount: widgetAmount
        })
    }
}