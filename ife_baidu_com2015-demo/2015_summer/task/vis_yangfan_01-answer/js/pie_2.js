// 使用
require(
    [
        'echarts',
        'echarts/chart/pie' // 使用饼图就加载pie模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('pie_2_main'));                                 
        
        option = {
            backgroundColor : 'rgb(255,255,255)',
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'horizontal',
                y : 'bottom',
                data:['AQI>300','200<AQI<300','AQI<200']
            },
            calculable : true,
            series : [
                {
                    name:'AQI',
                    type:'pie',
                    radius : '40%',
                    center: ['50%', '35%'],
                    data:[
                        {value:100, name:'AQI>300'},
                        {value:100, name:'200<AQI<300'},
                        {value:165, name:'AQI<200'}
                    ]
                }
            ]
        };
                    
                    
            
        // 为echarts对象加载数据 
        myChart.setOption(option); 
    }
);