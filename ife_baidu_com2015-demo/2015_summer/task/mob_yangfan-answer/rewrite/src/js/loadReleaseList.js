define(['loadBillList'], function(loadBillList){
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
});