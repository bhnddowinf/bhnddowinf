require.config({
    shim: {
        zepto: {
            exports: '$'
        }
    }
});
require(['zepto','fastclick', 'loadBillList', 'loadChartList', 'loadReleaseList'], 
    function ($, FastClick, loadBillList, loadChartList, loadReleaseList){

        FastClick.attach(document.body);

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
    }
);