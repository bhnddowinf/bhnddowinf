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
        var myChart4 = ec.init(document.getElementById('line_main4')); 
        var myChart5 = ec.init(document.getElementById('line_main5'));
        var myChart6 = ec.init(document.getElementById('line_main6'));
        var myChart7 = ec.init(document.getElementById('line_main7')); 
        var myChart8 = ec.init(document.getElementById('line_main8'));
        var myChart9 = ec.init(document.getElementById('line_main9'));
        var myChart10 = ec.init(document.getElementById('line_main10')); 
        var myChart11 = ec.init(document.getElementById('line_main11'));
        var myChart12 = ec.init(document.getElementById('line_main12'));
        var myChart13 = ec.init(document.getElementById('line_main13')); 
        var myChart14 = ec.init(document.getElementById('line_main14'));
        var myChart15 = ec.init(document.getElementById('line_main15'));
        var myChart16 = ec.init(document.getElementById('line_main16')); 
        var myChart17 = ec.init(document.getElementById('line_main17'));
        var myChart18 = ec.init(document.getElementById('line_main18'));
        var myChart19 = ec.init(document.getElementById('line_main19')); 
        var myChart20 = ec.init(document.getElementById('line_main20'));
        var myChart21 = ec.init(document.getElementById('line_main21'));
        var myChart22 = ec.init(document.getElementById('line_main22')); 
        var myChart23 = ec.init(document.getElementById('line_main23'));
        var myChart24 = ec.init(document.getElementById('line_main24'));
        var myChart25 = ec.init(document.getElementById('line_main25')); 
        var myChart26 = ec.init(document.getElementById('line_main26'));
        var myChart27 = ec.init(document.getElementById('line_main27'));
        var WeekTop = {
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
                    name : "周(时间)",
                    type : 'category',
                    data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40',
                    '41','42','43','44','45','46','47','48','49','50','51','52']
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
                    barWidth: 5, 
                    data:[],
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
        var WeekAverage = {
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
                    name : "周(时间)",
                    type : 'category',
                    data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40',
                    '41','42','43','44','45','46','47','48','49','50','51','52']
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
                    barWidth: 5, 
                     data:[],
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
        var WeekDayNum = {
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
                    name : "周(时间)",
                    type : 'category',
                    data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40',
                    '41','42','43','44','45','46','47','48','49','50','51','52']
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
                    barWidth: 5, 
                    data:[],
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
        var MonthTop = {
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
                    data:[],
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
        var MonthAverage = {
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
                    data:[],
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
        var MonthDayNum = {
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
                    data:[],
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
        var QuarterTop = {
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
                    name : "季(时间)",
                    type : 'category',
                    data : ['春','夏','秋','冬']
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
                    barWidth: 60, 
                    data:[],
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
        var QuarterAverage = {
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
                    name : "季(时间)",
                    type : 'category',
                    data : ['春','夏','秋','冬']
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
                    barWidth: 60, 
                    data:[],
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
        var QuarterDayNum = {
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
                    name : "季(时间)",
                    type : 'category',
                    data : ['春','夏','秋','冬']
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
                    barWidth: 60, 
                    data:[],
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
        
        option1 = WeekTop;
        option2 = WeekAverage;
        option3 = WeekDayNum;
        option4 = MonthTop;
        option5 = MonthAverage;
        option6 = MonthDayNum;
        option7 = QuarterTop;
        option8 = QuarterAverage;
        option9 = QuarterDayNum;
        option10 = WeekTop;
        option11 = WeekAverage;
        option12 = WeekDayNum;
        option13 = MonthTop;
        option14 = MonthAverage;
        option15 = MonthDayNum;
        option16 = QuarterTop;
        option17 = QuarterAverage;
        option18 = QuarterDayNum;
        option19 = WeekTop;
        option20 = WeekAverage;
        option21 = WeekDayNum;
        option22 = MonthTop;
        option23 = MonthAverage;
        option24 = MonthDayNum;
        option25 = QuarterTop;
        option26 = QuarterAverage;
        option27 = QuarterDayNum;
        (function WeekChart(){
            var Address = document.getElementsByClassName('address')[0];
            var Lis = Address.getElementsByTagName('ul')[0].getElementsByTagName('li');
            for(var i = 0;i <Lis.length;i++){
                Lis[i].index = i;
                option1.series[0].data = Data[0]; 
                option2.series[0].data = Data[1]; 
                option3.series[0].data = Data[2];
                option4.series[0].data = Data[3]; 
                option5.series[0].data = Data[4]; 
                option6.series[0].data = Data[5]; 
                option7.series[0].data = Data[6]; 
                option8.series[0].data = Data[7]; 
                option9.series[0].data = Data[8]; 
                myChart1.setOption(option1); 
                myChart2.setOption(option2); 
                myChart3.setOption(option3);
                myChart4.setOption(option4); 
                myChart5.setOption(option5); 
                myChart6.setOption(option6); 
                myChart7.setOption(option7); 
                myChart8.setOption(option8); 
                myChart9.setOption(option9);
                Lis[i].onclick = function(){
                    for(var i = 0;i < Lis.length;i++){
                        Lis[i].className = " ";
                    }
                    this.className = "active_address";
                    option1.series[0].data = Data[this.index*9]; 
                    option2.series[0].data = Data[this.index*9+1]; 
                    option3.series[0].data = Data[this.index*9+2];
                    option4.series[0].data = Data[this.index*9+3]; 
                    option5.series[0].data = Data[this.index*9+4]; 
                    option6.series[0].data = Data[this.index*9+5]; 
                    option7.series[0].data = Data[this.index*9+6]; 
                    option8.series[0].data = Data[this.index*9+7]; 
                    option9.series[0].data = Data[this.index*9+8];
                    myChart1.setOption(option1); 
                    myChart2.setOption(option2); 
                    myChart3.setOption(option3); 
                    myChart4.setOption(option4); 
                    myChart5.setOption(option5); 
                    myChart6.setOption(option6);
                    myChart7.setOption(option7); 
                    myChart8.setOption(option8); 
                    myChart9.setOption(option9);
                }
            }
        })();
        (function WeekChart_ShangHai(){
            var Address = document.getElementsByClassName('address')[1];
            var Lis = Address.getElementsByTagName('ul')[0].getElementsByTagName('li');
            for(var i = 0;i <Lis.length;i++){
                Lis[i].index = i;
                option10.series[0].data = Data[9]; 
                option11.series[0].data = Data[10]; 
                option12.series[0].data = Data[11];
                option13.series[0].data = Data[12]; 
                option14.series[0].data = Data[13]; 
                option15.series[0].data = Data[14]; 
                option16.series[0].data = Data[15]; 
                option17.series[0].data = Data[16]; 
                option18.series[0].data = Data[17];
                myChart10.setOption(option10); 
                myChart11.setOption(option11); 
                myChart12.setOption(option12);
                myChart13.setOption(option13); 
                myChart14.setOption(option14); 
                myChart15.setOption(option15); 
                myChart16.setOption(option16); 
                myChart17.setOption(option17); 
                myChart18.setOption(option18);
                Lis[i].onclick = function(){
                    for(var i = 0;i < Lis.length;i++){
                        Lis[i].className = " ";
                    }
                    this.className = "active_address";
                    option10.series[0].data = Data[this.index*9]; 
                    option11.series[0].data = Data[this.index*9+1]; 
                    option12.series[0].data = Data[this.index*9+2];
                    option13.series[0].data = Data[this.index*9+3]; 
                    option14.series[0].data = Data[this.index*9+4]; 
                    option15.series[0].data = Data[this.index*9+5]; 
                    option16.series[0].data = Data[this.index*9+6]; 
                    option17.series[0].data = Data[this.index*9+7]; 
                    option18.series[0].data = Data[this.index*9+8];
                    myChart10.setOption(option10); 
                    myChart11.setOption(option11); 
                    myChart12.setOption(option12);
                    myChart13.setOption(option13); 
                    myChart14.setOption(option14); 
                    myChart15.setOption(option15); 
                    myChart16.setOption(option16); 
                    myChart17.setOption(option17); 
                    myChart18.setOption(option18);
                }
            }
        })();

        (function WeekChart_GuangZhou(){
            var Address = document.getElementsByClassName('address')[2];
            var Lis = Address.getElementsByTagName('ul')[0].getElementsByTagName('li');
            for(var i = 0;i <Lis.length;i++){
                Lis[i].index = i;
                option19.series[0].data = Data[18]; 
                option20.series[0].data = Data[19]; 
                option21.series[0].data = Data[20];
                option22.series[0].data = Data[21]; 
                option23.series[0].data = Data[22]; 
                option24.series[0].data = Data[23]; 
                option25.series[0].data = Data[24]; 
                option26.series[0].data = Data[25]; 
                option27.series[0].data = Data[26];
                myChart19.setOption(option19); 
                myChart20.setOption(option20); 
                myChart21.setOption(option21);
                myChart22.setOption(option22); 
                myChart23.setOption(option23); 
                myChart24.setOption(option24); 
                myChart25.setOption(option25); 
                myChart26.setOption(option26); 
                myChart27.setOption(option27); 
                Lis[i].onclick = function(){
                    for(var i = 0;i < Lis.length;i++){
                        Lis[i].className = " ";
                    }
                    this.className = "active_address";
                    option19.series[0].data = Data[this.index*9]; 
                    option20.series[0].data = Data[this.index*9+1]; 
                    option21.series[0].data = Data[this.index*9+2];
                    option22.series[0].data = Data[this.index*9+3]; 
                    option23.series[0].data = Data[this.index*9+4]; 
                    option24.series[0].data = Data[this.index*9+5]; 
                    option25.series[0].data = Data[this.index*9+6]; 
                    option26.series[0].data = Data[this.index*9+7]; 
                    option27.series[0].data = Data[this.index*9+8];
                    myChart19.setOption(option19); 
                    myChart20.setOption(option20); 
                    myChart21.setOption(option21);
                    myChart22.setOption(option22); 
                    myChart23.setOption(option23); 
                    myChart24.setOption(option24); 
                    myChart25.setOption(option25); 
                    myChart26.setOption(option26); 
                    myChart27.setOption(option27); 
                }
            }
        })();
    
    }
);