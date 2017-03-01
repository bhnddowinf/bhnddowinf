// 出现数字的动画效果
var showNumber = function(x,y,number) {
	var numberCell = $("#number-cell-"+x+"-"+y);

	numberCell.css({
		'width': cellSideLength,
		'height': cellSideLength,
		'top': getPosTop(x,y),
		'left': getPosLeft(x,y),
		'line-height': cellSideLength+'px',
		'font-size': 0.6*cellSideLength+'px',
		'background-color': getNumberBackgroundColor(number),
		'color': getNumberColor(number)
	});
	if(number>=1024){
		numberCell.css("font-size", "40px");
	}
	numberCell.text( number );
};

// 移动数字的动画效果
var moveAnimate = function(fx, fy, tx, ty) {
	var numberCell = $("#number-cell-"+fx+"-"+fy);
	numberCell.animate({
		top: getPosTop(tx,ty),
		left: getPosLeft(tx,ty),
	},200);
};

//游戏结束

var gameOver = function() {
	alert("Game Over!");
};

//更新分数
var updateScore = function( score ) {
	$("#score").text(score);
};