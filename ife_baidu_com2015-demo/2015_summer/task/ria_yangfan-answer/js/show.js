init();

var image = {};
var offset = 0;
var imageArr = [];

function init() {
    $.ajax({
        type: 'GET',
        url: 'getfile.php',
        dataType: 'json',
        success: function(response) {
            image = response;
            appendMenu();
            imageArr = image.allimage;
            appendImage(6);
        }
    });
}

function appendMenu() {
    var storage = window.localStorage;
    var menu = JSON.parse(storage.getItem("menu"));
    if (!menu) {
        return false;
    }
    var appendMenuHtml = "";
    for (var i = 0; i < menu.length; i++) {
        appendMenuHtml += '<li id=' + menu[i][0] + ' >' + menu[i][1] + '</li>';
    }
    $(".nav ul").empty();
    $(".nav ul").append(appendMenuHtml);
    $("#allimage").addClass("active");
    $("#show").replaceWith('<li id="manage"><a href="./manage.html">管理图片<i class="icon-link"></i></a></li>');
}

function appendImage(num) {
    $("#col-1, #col-2, #col-3").empty();
    if (num) {
        while (num--) {
            (function(i) {
                if (imageArr[offset]) {
                    var tmpImage = new Image();
                    tmpImage.src = imageArr[offset];
                    tmpImage.className = "min";
                    $(tmpImage).load(function() {
                        var col = getShortCol();
                        col.append(tmpImage);
                    });
                    offset++;
                }
            }(num))
        }
    }
    var colHeight = (getShortCol()).height() + (getShortCol()).offset().top;
    if (colHeight < ($(window).scrollTop() + $(window).height())) {
        appendSingleImage();
        offset++;
    }
}

function appendSingleImage() {
    if (imageArr[offset]) {
        var tmpImage = new Image();
        tmpImage.src = imageArr[offset];
        tmpImage.className = "min";
        $(tmpImage).load(function() {
            var col = getShortCol();
            col.append(tmpImage);
            var colHeight = (getShortCol()).height() + (getShortCol()).offset().top;
            if (colHeight < ($(window).scrollTop() + $(window).height())) {
                appendSingleImage();
                offset++;
            }
        });
    } else {
        return false;
    }
}

$(document).scroll(function() {
    var colHeight = (getShortCol()).height() + (getShortCol()).offset().top;
    if (colHeight < ($(window).scrollTop() + $(window).height())) {
        appendSingleImage();
        offset++;
    }
    if ($(document).scrollTop() > 500) {
        $(".icon-up-open-big").fadeIn();
    } else {
        $(".icon-up-open-big").fadeOut();
    }
})

$("body").click(function(e) {
    var target = e.target;
    if (target.className == "min") {
        minImage = e.target;
        showMaxImage(e);
        return 0;
    } else if (target.className == "icon-cancel") {
        cancel();
        return 0;
    } else if (target.className == "icon-left-open-big") {
        lookLeft();
    } else if (target.className == "icon-right-open-big") {
        lookRight();
    } else if (target.className == "icon-up-open-big") {
        $("body").animate({
            scrollTop: 0
        }, 500);
    }

});

$(".nav > ul").on("click", "li", function(e) {
    $(e.target).siblings().removeClass('active');
    $(e.target).addClass("active");
    imageArr = image[e.target.id];
    offset = 0;
    appendImage(6);
});

function lookLeft() {
    if (!$(minImage).prev()[0]) {
        if ($(minImage).parent().parent().prev()[0]) {
            minImage = $(minImage).parent().parent().prev().children(0).children().last()[0];
        } else {
            alert("已经是第一张了！");
            return 0;
        }
    } else {
        minImage = $(minImage).prev()[0];
    }
    var tmpImage = createImage(minImage);
    $(".max").attr("src", tmpImage.node.src);
    $(".max").css({
        "top": tmpImage.y,
        "left": tmpImage.x,
        "height": tmpImage.height
    });
}

function lookRight() {

    if (!$(minImage).next()[0]) {
        if ($(minImage).parent().parent().next(".col-img")[0]) {
            minImage = $(minImage).parent().parent().next().children(0).children(0)[0];
        } else {
            alert("已经是最后一张了！");
            return 0;
        }
    } else {
        minImage = $(minImage).next()[0];
    }
    var tmpImage = createImage(minImage);
    $(".max").attr("src", tmpImage.node.src);
    $(".max").css({
        "top": tmpImage.y,
        "left": tmpImage.x,
        "height": tmpImage.height
    });
}

function createImage(target) {
    var tmpImage = new Image();
    tmpImage.src = target.src;

    var imageWidth = tmpImage.width;
    var imageHeight = tmpImage.height;

    if (imageWidth > $(window).width() * 0.85) {
        imageWidth = $(window).width() * 0.85;
    }
    imageHeight = imageHeight * (imageWidth / tmpImage.width);
    var x = ($(window).width() - imageWidth) / 2;
    var y = ($(window).height() - imageHeight) / 2;
    return {
        "node": tmpImage,
        "x": x,
        "y": y,
        "height": imageHeight
    };
}

function getShortCol() {
    var height1 = $("#col-1").height();
    var height2 = $("#col-2").height();
    var height3 = $("#col-3").height();

    if (height1 <= height2 && height1 <= height3) {
        return $("#col-1");
    } else if (height2 <= height1 && height2 <= height3) {
        return $("#col-2");
    } else {
        return $("#col-3");
    }
}

function showMaxImage(e) {

    //立即显示shadow,防止多次点击
    $("#shadow").css("visibility", "visible");
    $("#shadow").animate({
        opacity: .8
    }, 500);

    var tmpImage = createImage(e.target);

    $(tmpImage.node).addClass('max');
    $("body").append(tmpImage.node);

    $(tmpImage.node).css({
            "top": e.clientY,
            "left": e.clientX,
        })
        .animate({
            height: tmpImage.height,
            top: tmpImage.y,
            left: tmpImage.x
        }, 500);

    $(".max").on("mousedown", startMove);
}

function cancel() {
    $("#shadow").css({
        "visibility": "hidden",
        "opacity": 0
    });
    $(".max").remove();
}

function startMove(e) {
    e.preventDefault(); //图片会有拖拽的默认事件
    e.stopPropagation();

    var deltaX = e.clientX - $(".max")[0].offsetLeft;
    var deltaY = e.clientY - $(".max")[0].offsetTop;

    $(document).on('mousemove', moving);
    $(document).on('mouseup', endMoving);

    function moving(e) {
        $(".max").css({
            "top": e.clientY - deltaY,
            "left": e.clientX - deltaX
        });
    }

    function endMoving() {
        $(document).off('mousemove', moving);
        $(document).off('mouseup', endMoving);
    }
}
