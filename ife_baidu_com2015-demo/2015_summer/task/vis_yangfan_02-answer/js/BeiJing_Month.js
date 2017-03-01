// 使用
require(
    [
        'echarts',
        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart1 = ec.init(document.getElementById('line_main1')); 
        var myChart2 = ec.init(document.getElementById('line_main2'));
        var myChart3 = ec.init(document.getElementById('line_main3'));                                  
        
        option1 = {
            backgroundColor : 'rgb(255,255,255)',
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    name : "月(时间)",
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    name : "AQI峰值",
                    splitNumber : 3,
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'AQI',
                    type:'bar',
                    barWidth: 30, 
                    data:[100, 154, 139, 89, 162, 130, 150, 190, 230, 210, 190,178],
                    itemStyle : {
                         normal: {
                            color : 'rgb(64,159,232)',
                            barBorderRadius : 5
                        },
                        emphasis: {
                            color : 'rgb(64,159,232)',
                            barBorderRadius : 5
                        }
                    },
                    // lineStyle : {
                    //     color: ['#ccc'],
                    //     width: 1,
                    //     type: 'dotted'
                    // },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };

        option2 = {
            backgroundColor : 'rgb(255,255,255)',
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    name : "月(时间)",
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    name : "AQI平均值",
                    splitNumber : 3,
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'AQI',
                    type:'bar',
                    barWidth: 30, 
                    data:[78, 123, 119, 69, 122, 100, 123, 167, 192, 170, 166,158],
                    itemStyle : {
                         normal: {
                            color : 'rgb(64,159,232)',
                            barBorderRadius : 5
                        },
                        emphasis: {
                            color : 'rgb(64,159,232)',
                            barBorderRadius : 5
                        }
                    },
                    // lineStyle : {
                    //     color: ['#ccc'],
                    //     width: 1,
                    //     type: 'dotted'
                    // },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };

        option3 = {
            backgroundColor : 'rgb(255,255,255)',
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    name : "月(时间)",
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    name : "AQI<100的天数",
                    splitNumber : 3,
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'AQI',
                    type:'bar',
                    barWidth: 30, 
                    data:[12, 13, 9, 14, 7, 21, 16, 12, 10, 6, 20,21],
                    itemStyle : {
                         normal: {
                            color : 'rgb(64,159,232)',
                            barBorderRadius : 5
                        },
                        emphasis: {
                            color : 'rgb(64,159,232)',
                            barBorderRadius : 5
                        }
                    },
                    // lineStyle : {
                    //     color: ['#ccc'],
                    //     width: 1,
                    //     type: 'dotted'
                    // },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };
                    
        // 为echarts对象加载数据 
        myChart1.setOption(option1); 
        myChart2.setOption(option2); 
        myChart3.setOption(option3); 
    }
);