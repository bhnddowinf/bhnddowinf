initAll();

var image = {};

function initAll() {
    $.ajax({
        type: 'GET',
        url: 'getfile.php',
        dataType: 'json',
        success: function(response) {
            image = response;
            appendMenu();
            appendImage(image.allimage);
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
        appendMenuHtml += '<li id=' + menu[i][0] + ' draggable="true">' + menu[i][1] +'</li>';
    }
    $("#nav-menu").empty().append(appendMenuHtml);
    $("#allimage").addClass("active");
    $("#show").html('<a href="./show.html" draggable="false">展示页面<i class="icon-link"></i></a>');
}

function appendImage(imageArr) {
    $(".img-list").empty();
    var appendhtml = "";
    for (var i = 0; i < imageArr.length; i++) {
        appendhtml += '<li class="img-box"  draggable="true">' +
            '<div class="img"><img class="" src="" draggable="false"></div>' +
            '<div class="img-title">hello</div>' +
            '<i class="icon-dot-3"></i>' +
            '<ul class="img-edit-menu">' +
            '<li class="img-edit"><i class="icon-pencil"></i>编辑</li>' +
            '<li class="img-delete"><i class="icon-trash-empty"></i>删除</li>' +
            '</ul>' +
            '</li>';
    }
    $(".img-list").append(appendhtml);
    $(".img-edit-menu").mouseleave(function() {
        $(this).css("visibility", "hidden");
    });

    var than = $(".img").width() / $(".img").height();
    $(".img-title").each(function(index) {
        $(this).html(imageArr[index]);
    });
    $(".img-list img").each(function(index) {
        $(this).attr("src", imageArr[index]);

        $(this).load(function() {
            if ($(this).width() / $(this).height() >= than) {
                $(this).addClass("layout-h");
            } else {
                $(this).addClass("layout-w");
            }
            $(this).css("visibility", "visible");
        });

    });
}

$(".img-list").on("click", ".icon-dot-3", function(e) {
    $(e.target).next().css("visibility", "visible");
});
$(".img-list").on("click", ".img-edit", function(e) {
    var img = $(e.target).parent().prevAll(".img").children(0);
    $(e.target).parent().css("visibility", "hidden");
    editImage(img);
});
$(".img-list").on("click", ".img-delete", function(e) {
    $(e.target).parent().css("visibility", "hidden");
    $(e.target).parent().parent().remove();
});
$(".icon-up-open-big").click(function(e) {
    $("body").animate({
        scrollTop: 0
    }, 500);
})

$("#nav-menu").on("click", "li", function(e) {
    $(e.target).siblings().removeClass('active');
    $(e.target).addClass("active");
    appendImage(image[e.target.id]);
});

$("#nav-menu").on("dragstart", "li", function(e) {
    dragTarget = e.target;
});

$("#nav-menu").on("drop", "li", function(e) {
    var target = e.target;
    if (e.target.tagName.toLowerCase() != 'li') {
        target = e.target.parentNode;
    }
    if (target == dragTarget || !$("#nav-menu")[0].contains(dragTarget) ) {
        return false;
    }

    $($(target).clone()).insertAfter($(dragTarget));
    $(target).replaceWith($(dragTarget));
    setStorageMenu();
});


$("#nav-menu").on("dragover", "li", function(e) {
    e.preventDefault();
});
$("#nav-menu").on("mouseenter", "li", function(){
    var top = this.offsetTop;
    $(".nav-label").css("transform", "translate(0px,"+ top +"px)");
});
$("#nav-menu").on("mouseleave", "li", function(){
    var top = $(".active")[0].offsetTop;
    $(".nav-label").css("transform", "translate(0px,"+ top +"px)");
});

function setStorageMenu() {
    var storage = window.localStorage;
    var menu = [];
    $("#nav-menu li").each(function(index, item) {
        menu[index] = [];
        menu[index].push(item.id);
        menu[index].push(item.innerText);
    });
    storage.setItem('menu', JSON.stringify(menu));
}

$(".img-list").on("dragstart", "li", function(e) {
    dragTarget = e.target;
});

$(".img-list").on("drop", "li", function(e) {
    var $target = $(e.target).parents(".img-box");

    if (dragTarget == $target[0] || !$(dragTarget).hasClass("img-box")) {
        return false;
    }
    $($target.clone()).insertAfter($(dragTarget));
    $($target).replaceWith($(dragTarget));

});
$(".img-list").on("dragover", ".img-box", function(e) {
    e.preventDefault();
});

$(document).on("scroll", function(e) {
    if ($(document).scrollTop() > 500) {
        $(".icon-up-open-big").fadeIn();
    } else {
        $(".icon-up-open-big").fadeOut();
    }
});

var editImage = function(srcImageTarget) {
    var tmpImage = new Image();
    var imageWidth;
    var imageHeight;
    var srcImageTarget = $(srcImageTarget).get(0);

    var init = function() {
        $(".nav-edit").css("zIndex", 2);
        $("#shadow").css("display", "block");

        var y = ($(window).height() - 200) / 2;
        var x = ($(".col-right").width() - 200) / 2 + $(".col-right").offset().left;
        $(".overlay").css({
            "display": "block",
            "top": y,
            "left": x,
            "width": 200,
            "height": 200
        });


        $("#rotate").on("click", ".icon-ccw-1, .icon-cw, .icon-resize-horizontal, .icon-resize-vertical", rotate);
        $(".icon-cancel").on("click", exit);
        $(".crop").on("click", crop);
        $("#filter").on("click", ".gray, .reverse, .old, .cold", filterImage);
        $(".saveImage").on("click", saveImage);
        $(".text-height, .text-width").on("input propertychange", changeCrop);
        $(".icon-minus, .icon-plus").on("click", changeSlider);
        $("input[type='range']").on("change input propertychange", resizeImage);
        $(".overlay").on('mousedown', '.resize-handle', resizeOverlay);

        tmpImage.src = srcImageTarget.src;
        $(tmpImage).load(showImage);

    };

    var showImage = function() {

        imageWidth = tmpImage.width;
        imageHeight = tmpImage.height;

        if (imageWidth > $(window).width() * 0.65) {
            imageWidth = $(window).width() * 0.65;
        }
        imageHeight = imageHeight * (imageWidth / tmpImage.width);

        var x = ($(".col-right").width() - imageWidth) / 2 + $(".col-right").offset().left;
        var y = ($(window).height() - imageHeight) / 2;
        $(".col-right").append(tmpImage);
        tmpImage.width = imageWidth;
        $(tmpImage).addClass("tmp-image");
        $(tmpImage).css({
            "top": y,
            "left": x,
        });

        $(".scale-range").val(50);
        $(".size").html($(".tmp-image").width() + "×" + $(".tmp-image").height());
        $(".tmp-image").on("mousedown", startMove);
    };

    var startMove = function(e) {
        e.preventDefault(); //图片会有拖拽的默认事件
        e.stopPropagation();

        var deltaX = e.clientX - tmpImage.offsetLeft;
        var deltaY = e.clientY - tmpImage.offsetTop;

        $("body").on('mousemove', moving);
        $("body").on('mouseup', endMoving);

        function moving(e) {
            $(tmpImage).css({
                "top": e.clientY - deltaY,
                "left": e.clientX - deltaX
            });
        }

        function endMoving() {
            $("body").off('mousemove', moving);
            $("body").off('mouseup', endMoving);
        }
    };

    var rotate = function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (/[-\d]+/.exec(tmpImage.style.transform)) {
            var deg = parseInt(/[-\d]+/.exec(tmpImage.style.transform)[0]);
        } else {
            deg = 0;
        }

        var classname = e.target.className;
        if (classname == "icon-cw") {
            deg += 90;
        } else if (classname == "icon-ccw-1") {
            deg -= 90;
        } else if (classname == "icon-resize-horizontal") {
            deg += 180;
        } else {
            deg -= 180;
        }
        var rotate = "rotate(" + deg + "deg)";
        $(tmpImage).css("transform", rotate);
    };

    var exit = function() {
        $(".overlay").css("display", "none");
        $("#shadow").css("display", "none");
        $(".nav-edit").css("zIndex", 0);
        $(".tmp-image").remove();

        $(".tmp-image").off("mousedown", startMove);
        $("#rotate").off("click", ".icon-ccw-1, .icon-cw, .icon-resize-horizontal, .icon-resize-vertical", rotate);
        $(".icon-cancel").off("click", exit);
        $(".crop").off("click", crop);
        $("#filter").off("click", ".gray, .reverse, .old, .cold", filterImage);
        $(".saveImage").off("click", saveImage);
        $(".text-height, .text-width").off("input propertychange", changeCrop);
        $(".icon-minus, .icon-plus").off("click", changeSlider);
        $("input[type='range']").off("change input propertychange", resizeImage);
        $(".overlay").off('mousedown', '.resize-handle', resizeOverlay);

    };

    var crop = function(e) {
        e.stopPropagation();

        var left = $('.overlay')[0].offsetLeft - tmpImage.offsetLeft;
        var top = $('.overlay')[0].offsetTop - tmpImage.offsetTop;

        var width = $('.overlay').width();
        var height = $('.overlay').height();

        var cropCanvas = document.createElement('canvas');
        cropCanvas.width = width;
        cropCanvas.height = height;

        var imageCanvas = document.createElement('canvas');
        imageCanvas.width = tmpImage.width;
        imageCanvas.height = tmpImage.height;
        imageCanvas.getContext('2d').drawImage(tmpImage, 0, 0, imageCanvas.width, imageCanvas.height);

        cropCanvas.getContext('2d').drawImage(imageCanvas, left, top, width, height, 0, 0, width, height);

        tmpImage.src = cropCanvas.toDataURL("image/png");

        $(".tmp-image").attr("width", width);

        $(".overlay").css({
            "top": ($(window).height() - height) / 2,
            "left": ($(".col-right").width() - width) / 2 + $(".col-right").offset().left
        });

    };

    var filterImage = function(e) {
        e.stopPropagation();

        var imageCanvas = document.createElement('canvas');
        var context = imageCanvas.getContext('2d');

        imageCanvas.width = $(".tmp-image").width();
        imageCanvas.height = $(".tmp-image").height();

        context.drawImage(tmpImage, 0, 0, imageCanvas.width, imageCanvas.height);
        var imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        var pixels = imageData.data;

        if (e.target == $(".reverse")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                pixels[i * 4] = 255 - pixels[i * 4];
                pixels[i * 4 + 1] = 255 - pixels[i * 4 + 1];
                pixels[i * 4 + 2] = 255 - pixels[i * 4 + 2];
            }
        } else if (e.target == $(".gray")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                var average = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3;
                pixels[i * 4] = average;
                pixels[i * 4 + 1] = average;
                pixels[i * 4 + 2] = average;
            }
        } else if (e.target == $(".old")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                var r = 0.393 * pixels[i * 4] + 0.769 * pixels[i * 4 + 1] + 0.189 * pixels[i * 4 + 2];
                var g = 0.349 * pixels[i * 4] + 0.686 * pixels[i * 4 + 1] + 0.168 * pixels[i * 4 + 2];
                var b = 0.272 * pixels[i * 4] + 0.534 * pixels[i * 4 + 1] + 0.131 * pixels[i * 4 + 2];

                pixels[i * 4] = r;
                pixels[i * 4 + 1] = g;
                pixels[i * 4 + 2] = b;
            }
        } else if (e.target == $(".cold")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                var r = (pixels[i * 4] - pixels[i * 4 + 1] - pixels[i * 4 + 2]) * 3 / 2;
                var g = (pixels[i * 4 + 1] - pixels[i * 4] - pixels[i * 4 + 2]) * 3 / 2;
                var b = (pixels[i * 4 + 2] - pixels[i * 4 + 1] - pixels[i * 4]) * 3 / 2;

                if (r < 0) {
                    r = -r;
                } else if (r > 255) {
                    r = 255;
                }
                if (g < 0) {
                    g = -g;
                } else if (g > 255) {
                    g = 255;
                }
                if (b < 0) {
                    b = -b;
                } else if (b > 255) {
                    b = 255;
                }

                pixels[i * 4] = r;
                pixels[i * 4 + 1] = g;
                pixels[i * 4 + 2] = b;
            }
        }

        context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        context.putImageData(imageData, 0, 0);
        $(".tmp-image").attr("src", imageCanvas.toDataURL("image/png"));
        $("input[type='range']").change();
    };

    var saveImage = function(e) {
        e.stopPropagation();

        var imgData = tmpImage.src;
        var type = imgData.match(/png|jpg|bmp|gif/)[0];
        var filename = 'image' + (new Date()).getTime() + '.' + type;
        var link = document.createElement('a');

        link.href = imgData;
        link.download = filename;

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    };

    var changeCrop = function(e) {
        e.stopPropagation();

        var value = e.target.value;
        if (value <= 0) {
            return;
        }
        if (e.target == $(".text-height")[0]) {
            $(".overlay").css("height", value);
            $(".overlay").css("top", ($(window).height() - value) / 2);
        } else {
            $(".overlay").css("width", value);
            $(".overlay").css("left", ($(".col-right").width() - value) / 2 + $(".col-right").offset().left);
        }

    };

    var changeSlider = function(e) {
        e.stopPropagation();

        var value = +$(".scale-range").val();
        if (e.target == $(".icon-minus")[0]) {
            value -= 1;
        } else {
            value += 1;
        }
        $("input[type='range']").val(value).change();

    };

    var resizeImage = function(e) {
        e.stopPropagation();

        var value = +$(".scale-range").val();
        var ratio = (value + 50) / 100;
        tmpImage.width = imageWidth * ratio;
        $(tmpImage).css({
            "top": ($(window).height() - $(tmpImage).height()) / 2,
            "left": ($(".col-right").width() - $(tmpImage).width()) / 2 + $(".col-right").offset().left
        });
        $(".percent").html(value + 50 + "%");
        $(".size").html($(tmpImage).width() + "×" + $(tmpImage).height());

    };

    var resizeOverlay = function(e) {
        e.stopPropagation();

        $("body").on('mousemove', resizingLay);
        $("body").on('mouseup', endResizeLay);
        var $target = $(e.target);
        var width, height, top, left;
        var oriWidth = $(".overlay").width();
        var oriHeight = $(".overlay").height();
        var oriTop = parseInt($(".overlay").css("top"));
        var oriLeft = parseInt($(".overlay").css("left"));

        function resizingLay(e) {
            if ($target.hasClass("resize-handle-nw")) {
                width = oriWidth - (e.clientX - oriLeft);
                height = oriHeight - (e.clientY - oriTop);
                left = e.clientX;
                top = e.clientY;
            } else if ($target.hasClass("resize-handle-ne")) {
                width = e.clientX - oriLeft;
                height = oriHeight - (e.clientY - oriTop);
                left = oriLeft;
                top = e.clientY;
            } else if ($target.hasClass("resize-handle-sw")) {
                width = oriWidth - (e.clientX - oriLeft);
                height = e.clientY - oriTop;
                left = e.clientX;
                top = oriTop;
            } else if ($target.hasClass("resize-handle-se")) {
                width = e.clientX - oriLeft;
                height = e.clientY - oriTop;
                left = oriLeft;
                top = oriTop;
            }
            $(".overlay").css({
                "width": width,
                "height": height,
                "top": top,
                "left": left
            });

            $(".text-height").val(height);
            $(".text-width").val(width);
        }

        function endResizeLay(e) {
            $("body").off('mousemove', resizingLay);
            $("body").off('mouseup', endResizeLay);
        }
    }

    init();

};
