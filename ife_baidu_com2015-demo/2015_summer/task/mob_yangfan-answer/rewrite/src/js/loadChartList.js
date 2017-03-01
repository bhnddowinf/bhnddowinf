define(['optionMap'], function(optionMap){
    var init = function(){
        getData();
        
        require.config({
            packages: [{
                name: 'echarts',
                location: './src',
                main: 'echarts'
            }, {
                name: 'zrender',
                location: './zrender/src',
                main: 'zrender'
            }]
        });
        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/pie',
            ],
            function (ec) {
                initChart(ec);
            }
        );
    };
    var initChart = function (ec) {
        var chartDomList = $(".mychart");
        var chartObjList = [];
        for(var i = 0 ; i < chartDomList.length; i++){
            (function(){
                var optionkey = chartDomList[i].dataset.optionkey;
                chartObjList[i] = ec.init(chartDomList[i], {
                    noDataLoadingOption:{
                        text : '暂无数据',
                        effect : 'bubble',
                        textStyle : {
                            fontFamily: "Microsoft YaHei",
                            fontSize : 14,
                        }
                    }  
                });
                chartObjList[i].setOption(optionMap[optionkey]);
            }())
        }
    };

    var getData = function(){
        optionMap.mypie.series[0].data = [];
        optionMap.myline.xAxis[0].data = [];
        optionMap.myline.series[0].data = [];
        optionMap.myline.series[1].data = [];

        var storage = window.localStorage;
        var mybill = JSON.parse(storage.getItem("mybill")) || undefined;
        if(!mybill || !mybill.billList.length){
            return false;
        }
        var remaining = ((mybill.income*100 - mybill.spending*100)/100).toFixed(2);
        $(".all-income").html("￥"+(mybill.income).toFixed(2));
        $(".all-spending").html("￥"+(mybill.spending).toFixed(2));
        $(".all-remaining").html("￥"+remaining);

        var monthArr = ["一月", "二月", "三月", "四月", "五月", "六月", 
                        "七月", "八月", "九月", "十月", "十一月", "十二月"];
        var categoryMap = {
            "clothes": "衣服",
            "diet": "饮食",
            "accommodation": "住宿",
            "traffic": "交通",
            "shopping": "购物",
            "others": "其他"
        };
        var categorylist = mybill.categorylist;
        
        for(var i in categorylist){
            var dataItem = {"value": categorylist[i], "name": categoryMap[i]};
            optionMap.mypie.series[0].data.push(dataItem);
        }
        var allZero = optionMap.mypie.series[0].data.every(function(item){
            return (item.value == 0);
        });
        if(allZero){
            optionMap.mypie.series[0].data = [];
        }

        var billList = mybill.billList;
        var month = billList[0].month;
        var incomeMonthMap = {};
        var spendingMonthMap = {};
        var monthNumArr = [];

        for(var i = 0; i < 6; i++){
            month = (month + 12)%12;
            monthNumArr.unshift(month);
            incomeMonthMap[month] = 0;
            spendingMonthMap[month] = 0;
            optionMap.myline.xAxis[0].data.unshift(monthArr[--month]);
        }

        for(var i = 0; i < mybill.billList.length; i++){
            var billItem = mybill.billList[i];
            if(billItem.month in incomeMonthMap){
                if(billItem.category == "income"){
                    incomeMonthMap[billItem.month] += +billItem.money;
                }else {
                    spendingMonthMap[billItem.month] += +billItem.money;
                }
            }else {
                break;
            }
        }
        for(var i = 0; i < 6 ; i++){
            optionMap.myline.series[0].data.push( incomeMonthMap[monthNumArr[i]] );
            optionMap.myline.series[1].data.push( spendingMonthMap[monthNumArr[i]] );
        }
    };

    return {init: init};
});