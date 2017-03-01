$(document).ready(function(){
    $("#tabfirst li").each(function(index){
        var liNode = $(this);
        $(this).click(function(){
            $("div.content").removeClass("content");
            $("#tabfirst li.tabin").removeClass("tabin");
            $("#con3 div").eq(index).addClass("content");
            liNode.addClass("tabin");
        });
    })
})







