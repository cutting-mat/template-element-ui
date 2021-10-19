/**
 * 约定格式转echart5-dataset格式
 * @param dataArray[Array] 必传，前后端约定图表通用格式
 * @param legendArray[Array] 必传，legend数组，长度应与dataArray一致
 * @return echart5-dataset格式，详见：https://echarts.apache.org/handbook/zh/concepts/dataset
 * */

export default function (dataArray, legendArray) {
    // 列头
    let colNames = ['product'].concat(dataArray.map((e, i) => {
        return legendArray[i] || `legend_${i}`;
    }));

    let source = [];

    // 约定格式校验
    if (dataArray[0] && Array.isArray(dataArray[0].label)) {
        source = dataArray[0].label.map((label, labelIndex) => {
            return [label].concat(dataArray.map(data => {
                return data.value[labelIndex] || 0
            }))
        })
    }

    return [colNames].concat(source);
}