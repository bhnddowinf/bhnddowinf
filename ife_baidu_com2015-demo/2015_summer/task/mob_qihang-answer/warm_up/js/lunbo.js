var prev = document.getElementById("prev");
var next = document.getElementById("next");
var timg = document.getElementById("imgs");
var dot = document.getElementById("nums").getElementsByTagName("li");
var iNow = 0;
timg.style.left = -600+"px";
var switchFlag = false; //正在切换标志
var flag = 1;
// window.onload = function () {
// 	var dot = document.getElementById("nums").getElementsByTagName("li");
// 	var iNow = 0;
// 	timg.style.left = -504+"px";

function showDot() {        // 显示小圆点
	for (var i=0,len = dot.length; i<len; i++){
		if(dot[i].className == "light") {
			dot[i].className = "";
			break;
		}
	}
	dot[iNow].className = "light";
}

function switchOver(offset) {  //图片切换
	switchFlag = true;
	var newLeft = parseInt(timg.style.left)+offset;
	var t = 500;				//切换总时间
	var interval = 20;			//切换间隔
	var speed = offset/(t/interval); //每次切换位移量

	function go() {
		if(parseInt(timg.style.left) != newLeft){
			//var speed=(newLeft-timg.style.left)/8;
			timg.style.left = parseInt(timg.style.left)+speed+"px";
			var timer_switch = setTimeout(go,interval);
		}else {
			timg.style.left = newLeft +"px";
			clearTimeout(timer_switch);
			if(newLeft >= 0) {
				timg.style.left = -3000 +"px";
			}else if(newLeft <= -3600) {
				timg.style.left = -600+"px";
			}
			switchFlag = false;
		}
	}
	go();
}

function clickDot(element) {
	flag = 0;
	var iNext = element.getAttribute("index");
	if(iNext == iNow) {
		return;
	}
	switchOver((iNext - iNow) * (-600));
	iNow = iNext;
	showDot();	
	flag = 1;
}

function moveNext() {     // 前进按钮
	if(!switchFlag){
		switchOver(-600);
		iNow++;
		if(iNow == 5) {
			iNow = 0;
		}
		showDot();
	}
}

function movePrev() {   //后退按钮
	if(!switchFlag){
		switchOver(600);
		iNow--;
		if(iNow == -1) {
			iNow = 4;
		}
		showDot();
	}	
}
