// 使用
require(
    [
        'echarts',
        'echarts/chart/pie' // 使用饼图就加载pie模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('pie_1_main'));                                 
        
        var labelTop = {
            normal : {
                label : {
                    show : true,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                        baseline : 'bottom'
                    }
                },
                labelLine : {
                    show : false
                }
            }
        };
        var labelFromatter = {
            normal : {
                label : {
                    formatter : function (params){
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        baseline : 'top'
                    }
                }
            },
        };
        var labelBottom = {
            normal : {
                color: '#ccc',
                label : {
                    show : true,
                    position : 'center'
                },
                labelLine : {
                    show : false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        var radius = [40, 55];
        option = {
            backgroundColor : 'rgb(255,255,255)',
            legend: {
                x : 'center',
                y : 'bottom',
                data:[
                    'AQI > 200','AQI < 200'
                ]
            },
            series : [
                {
                    type : 'pie',
                    center : ['25%', '40%'],
                    radius : radius,
                    x: '0%', // for funnel
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:46, itemStyle : labelBottom},
                        {name:'AQI > 200', value:54,itemStyle : labelTop}
                    ]
                },
                {
                    type : 'pie',
                    center : ['75%', '40%'],
                    radius : radius,
                    x:'20%', // for funnel
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:54, itemStyle : labelBottom},
                        {name:'AQI < 200', value:46,itemStyle : labelTop}
                    ]
                }
            ]
        };
            
        // 为echarts对象加载数据 
        myChart.setOption(option); 
    }
);