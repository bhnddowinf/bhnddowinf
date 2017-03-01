define(function(){
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
});