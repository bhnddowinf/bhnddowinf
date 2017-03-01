var optionMap = {
    mypie: {
        color: ["#f39f61", "#6fb2de", "#fe8988", "#da5a4c", "#c6b29c", "#fdc403"],
        tooltip : {
            trigger: 'item',
            formatter: "{b}{c}<br/>({d}%)",
            backgroundColor: "#e5e5e5",
            padding: 5,
            textStyle: {
                color: "#8c8c8c",
            },
        },
        series : [
            {
                type:'pie',
                radius : ['40%', '80%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            formatter: "{d}%",
                            textStyle : {
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
            }
        ],
    },

    myline: {
        tooltip : {
            trigger: 'item',
            formatter: "{c}",
            backgroundColor: "#e5e5e5",
            padding: 5,
            textStyle: {
                color: "#8c8c8c",
            },
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : [],
                axisLine: {
                    lineStyle: {
                        color: "#999",
                        width: 1
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#999",
                        fontFamily: "Microsoft YaHei"
                    }
                }
            }
        ],
        yAxis : [
            {
                show: false,
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series : [
            {
                itemStyle: {
                    normal: {
                        color: "#7fd2a9"
                        
                    }
                },
                name:'收入',
                type:'line',
                data:[],
                symbol: "circle",

            },
            {
                itemStyle: {
                    normal: {
                        color: "#db6c63"
                    }
                },
                name:'支出',
                type:'line',
                data:[],
                symbol: "circle",
            }
        ],
        grid: {
            x: "5%",
            y: "5%",
            width: "90%",
            height: "80%",
            borderWidth: 0
        }
    }

//**********optionMap  end****  
};

var loadBillList = (function(){
    var init = function(){
        $(".bill-list").on("swipeLeft swipeRight", "li", dealSwipe);
        $(".bill-list").on("click", ".icon-trash", dealTrash);
        $(".bill-list").on("click", ".icon-pencil", showEdit);
        appendBill();
    };

    var appendBill = function(){
        var storage = window.localStorage;
        var mybill = JSON.parse(storage.getItem("mybill")) || undefined;

        if(!mybill){
            return false;
        }
        $(".bill-list").empty();
        var billList = mybill.billList;
        var appendHtml = "";
        for(var i=0;i<billList.length;i++){
            appendHtml += '<li><div class="list-item">'+$("."+billList[i].category)[0].outerHTML;
            if(billList[i].category == "income" ){
                appendHtml += '<span class="money income-num">+'+ billList[i].money+'</span>';
            }else {
                appendHtml += '<span class="money spending-num">-'+ billList[i].money+'</span>';
            }
            appendHtml += '<div class="date">'+billList[i].date+'</div>'+
                                '</div>'+
                                '<div class="edit-item">'+
                                    '<i class="icon-pencil"></i>'+
                                    '<i class="icon-trash"></i>'+
                                '</div>'+
                            '</li>';
        }
        $(".bill-list").append(appendHtml);

    };

    var showEdit =  function(e){
        var toEdit = $(this).parent().prev();

        $(".input").empty().append($(toEdit).children().eq(0).clone());  
        $(".input").append('<div class="input-box"><i class="icon-yen">'
                                + '</i><input type="text"></div>');   
        $(".input input").val( parseFloat($(toEdit).children('.money').html()) );
        $(".input").css({"transform": "translate(0, -5rem)"});
        $(".main-title .icon-pencil")[0].click();

        setEditNum( $(toEdit).parent().index() );

    };

    var setEditNum = function(index){
        var storage = window.localStorage;
        var mybill = JSON.parse(storage.getItem("mybill"));
        if(!mybill){
            return false;
        }
        mybill.edit = index;
        storage.setItem('mybill', JSON.stringify(mybill));
    };

    var dealSwipe = function(e){
        var flag = false;
        $(this).siblings().each(function(index, item){
            if(item.style.transform == "translate(-8.8rem, 0px)"){
                item.style.transform = "translate(0px, 0px)";
                flag = true;
                return false;
            }
        });
        if(flag){
            return false;
        }
        if(e.type == "swipeLeft"){
            $(this).css({"transform": "translate(-8.8rem, 0)"});
        }else {
            $(this).css({"transform": "translate(0px, 0px)"});
        }
    }

    var dealTrash = function(){
        var toDelete = $(this).parents("li");
        var position = toDelete.index();

        var storage = window.localStorage;
        var mybill = JSON.parse(storage.getItem("mybill"));
        var billItem = mybill.billList[position];
        var money = parseFloat(billItem.money);

        if(billItem.category == "income"){
            mybill.income -= money;

        }else {
            mybill.spending -= money;
            mybill.categorylist[billItem.category] -= billItem.money;
        }

        mybill.billList.splice(position, 1);
        storage.setItem('mybill', JSON.stringify(mybill));
        $(toDelete).remove();
    };

    return {init: init, appendBill: appendBill, setEditNum: setEditNum};

}());

var loadReleaseList = (function(){
    var lastClick = +(new Date());

    var init = function(){
        $(".release-list").on("click", "i", toInput);
        $(".release-title .icon-cancel").on("click", exitRelease);
        $(".release-title .release").on("click", addBill);

    };
    var exitRelease = function(){
        $(".main-title").show().siblings().hide();
        $(".bill-list").show().siblings().hide();
        $(".input").css({"transform": "translate(0, 0)"});
        $(".main-title .icon-cancel").attr("class", "icon-menu");
        loadBillList.appendBill();
        loadBillList.setEditNum(-1);
    };
    var toInput = function(e){
        var target = e.target.parentNode;

        $(".input").empty().append($(target).clone());  
        $(".input").append('<div class="input-box">'+
                                    '<i class="icon-yen"></i>'+
                                    '<input type="text">'+
                                '</div>');
        $(".input").css({"transform": "translate(0, -5rem)"});
        loadBillList.setEditNum(-1);
    };

    var addBill = function() {
        if( +(new Date()) - lastClick < 300 ) {
            return false;
        }
        lastClick = +(new Date());
        var money = parseFloat( Math.abs($(".input-box input").val() ) ).toFixed(2);
        if( isNaN( money ) ){
            alert("请输入正确的金额！");
            return false;
        }
        if(money <= 0 || money > 10000 ){
            alert("单笔金额请在0 - 10000范围内 ！");
            return false;
        }
        var storage = window.localStorage;
        var mybill = JSON.parse(storage.getItem("mybill")) || {
            "billList": [],
            "income": 0,
            "spending": 0,
            "edit": -1,
            "categorylist": {
                "clothes": 0,
                "diet": 0,
                "accommodation": 0,
                "traffic": 0,
                "shopping": 0,
                "others": 0
            }
        };
        var dateObj = new Date();
        var month = (dateObj.getMonth()+1);
        var date = dateObj.getFullYear()+"/"+ month +"/"+dateObj.getDate();
        var billItem = {
            "date": date,
            "month": month,
            "money": money,
            "category": $(".input div").eq(0).attr("class")
        };

        if(billItem.category == "income"){
            mybill.income += parseFloat(billItem.money);
            if( mybill.edit >= 0 ){
                mybill.income -= parseFloat(mybill.billList[mybill.edit].money);
            }
        }else {
            mybill.spending += parseFloat(billItem.money);
            mybill.categorylist[billItem.category] += parseFloat(billItem.money);
            if( mybill.edit >= 0 ){
                mybill.spending -= parseFloat(mybill.billList[mybill.edit].money);
                mybill.categorylist[billItem.category] -= parseFloat(mybill.billList[mybill.edit].money);
            }
        }

        if( mybill.edit >= 0 ){
            mybill.billList.splice(mybill.edit, 1, billItem);
            mybill.edit = -1;
            alert("修改成功");
        }else {
            mybill.billList.unshift(billItem);
            alert("添加成功");
        }
        
        storage.setItem('mybill', JSON.stringify(mybill));
        $(".input").css({"transform": "translate(0, 0)"});
        setTimeout(function(){
            $(".input").empty();
        },300);

    };

    return {init: init};
}());


var loadChartList = (function(){
    var init = function(){
        getData();

        require.config({
            paths:{ 
                echarts: './js/dist',
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/pie'
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
}());

var loadAll = function(){
    loadBillList.init();
    loadReleaseList.init();

    $(".main-title").on("click", ".icon-menu, .icon-cancel, .icon-pencil", function(){
        if( this.className == "icon-menu" ){
            $(".menu").show().height("3.2rem");
            $(this).removeClass('icon-menu').addClass("icon-cancel");
        }else if( this.className == "icon-cancel" ) {

            $(".menu").height(0);
            $(this).removeClass('icon-cancel').addClass("icon-menu");
        }else if ( this.className == "icon-pencil" ){
            $(".release-list").show().siblings().hide();
            $(".release-title").show().siblings().hide();

        }
    });

    $(".menu").on("click", ".accounts-list, .accounts-chart", switchMenu);

    function switchMenu(e){
        $(this).addClass("active").siblings().removeClass("active");
        if( $(this).hasClass("accounts-list") ){
            $(".bill-list").show().siblings().hide();
            $(".main-title .icon-cancel")[0].click();
            $(".main-title .icon-pencil").css("visibility", "visible");
        }else {
            $(".chart-list").show().siblings().hide();
            $(".main-title .icon-cancel")[0].click();

            $(".main-title .icon-pencil").css("visibility", "hidden");
            loadChartList.init();

        }
    }

};

loadAll();