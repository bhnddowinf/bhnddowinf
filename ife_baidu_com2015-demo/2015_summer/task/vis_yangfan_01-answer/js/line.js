// 使用
require(
    [
        'echarts',
        'echarts/chart/line' // 使用折线图就加载line模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('line_main'));                                 
        
        option = {
            backgroundColor : 'rgb(255,255,255)',
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            xAxis : [
                {
                    name : "月(时间)",
                    type : 'category',
                    boundaryGap : false,
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    name : "AQI(空气质量)",
                    splitNumber : 3,
                    type : 'value',
                    axisLabel : {
                        formatter: '{value}'
                    }
                }
            ],
            series : [
                {
                    name:'AQI',
                    type:'line',
                    data:[100, 154, 139, 89, 162, 130, 150, 190, 230, 210, 190,178],
                    itemStyle : {
                         normal: {
                            color : 'rgb(8,93,56)'
                        },
                        emphasis: {
                            color : 'rgb(8,93,56)'
                        }
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        };
                    
                    
                    
            
        // 为echarts对象加载数据 
        myChart.setOption(option); 
    }
);