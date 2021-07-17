<template>
    <div class="datashowContent">
        <div id="echartsExample3"></div>
        <div id="echartsExample"></div>
        <div id="echartsExample2"></div>
        <div id="echartsExample5"></div>
        <div id="echartsExample1"></div>
        <div id="echartsExample4"></div>
    </div>
</template>

<script>
    export default {
        name: "DataShow",
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('echartsExample')) // echartsExample是显示echart的元素id
            var myChart1 = this.$echarts.init(document.getElementById('echartsExample1'))
            var myChart2 = this.$echarts.init(document.getElementById('echartsExample2'))
            var myChart3 = this.$echarts.init(document.getElementById('echartsExample3'))
            var myChart4 = this.$echarts.init(document.getElementById('echartsExample4'))
            var myChart5 = this.$echarts.init(document.getElementById('echartsExample5'))

            // 绘制图表
            myChart.setOption({
                title: {
                    text: '民宿分类'
                },
                tooltip: {},
                xAxis: {
                    data: ['能做饭', 'Loft', '一室一厅', '有投影', '聚会轰趴']
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
            myChart1.setOption({
                title: {
                    text: '订单分类统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '分类',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 48, name: '能做饭'},
                            {value: 35, name: '聚会轰趴'},
                            {value: 80, name: '一室一厅'},
                            {value: 84, name: '有投影'},
                            {value: 100, name: 'Loft'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
            myChart2.setOption({
                title: {
                    text: '用户数量'
                },
                xAxis: {
                    type: 'category',
                    data: ['12月', '1月', '2月', '3月', '4月', '5月', '6月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [10, 23, 34, 130, 200, 220, 240],
                    type: 'line',
                    smooth: true
                }]
            });
            myChart3.setOption({
                title: {
                    text: '民宿数量'
                },
                xAxis: {
                    type: 'category',
                    data: ['12月', '1月', '2月', '3月', '4月', '5月', '6月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [5, 13, 25, 30, 36, 40, 42],
                    type: 'line',
                    smooth: true
                }]
            });
            myChart4.setOption({
                title: {
                    text: '订单价格统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '价格',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 80, name: '100元以下'},
                            {value: 145, name: '100元-300元'},
                            {value: 100, name: '200元-300元'},
                            {value: 60, name: '300元以上'},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
            myChart5.setOption({
                title: {
                    text: '订单数量'
                },
                xAxis: {
                    type: 'category',
                    data: ['12月', '1月', '2月', '3月', '4月', '5月', '6月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [2, 5, 10, 20, 34, 44, 59],
                    type: 'line',
                    smooth: true
                }]
            });
        }
    }
</script>

<style scoped>
    .datashowContent {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #echartsExample, #echartsExample1, #echartsExample2, #echartsExample3, #echartsExample4, #echartsExample5 {
        width: 400px;
        height: 300px;
        margin-bottom: 25px;
    }
</style>