var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var isMerged = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var score = 0;

$(document).ready(function() {
	prepareForMobile();
	newGame();
});

var newGame = function() {
	// 初始化
	init();
	//在随机两个格子里面生成数字
	putOneNewNumber();
	putOneNewNumber();
};

var init = function() {
	for(var i=0; i<4; ++i){
		for(var j=0; j<4; ++j){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top", getPosTop(i,j));
			gridCell.css("left", getPosLeft(i,j));
		}
	}
	// 把界面清空
	board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	isMerged = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	update();
	updateScore(0);
};

var update = function() {
	$(".number-cell").remove();
	for(var i=0; i<4; ++i){
		for(var j=0; j<4; ++j){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j]==0){
				theNumberCell.css({
					'width': '0px',
					'height': '0px',
					'top': getPosTop(i,j)+cellSideLength/2,
					'left': getPosLeft(i,j)+cellSideLength/2
				});
			} else {
				showNumber(i,j,board[i][j]);
			}
			isMerged[i][j] = 0;
		}
	}
};

//  在一个随机的位置上放一个随机数
var putOneNewNumber = function() {
	if( noSpace( board ) ) {
		return false;
	}
	// 产生一个随机的位置
	var randomX = 0, randomY = 0, randomTimes = 0;
	while(randomTimes < 50){
		randomX = parseInt(Math.floor(Math.random()*4));
		randomY = parseInt(Math.floor(Math.random()*4));
		if(board[randomX][randomY]==0) {
			break;
		}
		++ randomTimes;
	}
	if( randomTimes>=50 ){
		for(var i=0; i<4; ++i){
			for(var j=0; j<4; ++j){
				if(board[i][j]==0){
					randomX = i; 
					randomY = j;
					break;
				}
			}
			if(board[randomX][randomY]==0){
				break;
			}
		}
	}
	// 随机产生一个2或者4
	var randomNumber = Math.random()<0.6?2:4;
	// 在随机的位置上显示随机的数字
	board[randomX][randomY] = randomNumber;
	showNumber(randomX, randomY, randomNumber);
	return true;
}

// 设置键盘监听事件 监听用户的键盘输入
$(document).keydown(function(event) {
	event.preventDefault();
	switch( event.keyCode ){
		case 37: // 如果用户按下了 ←
			if( canMoveLeft( board ) ){
				moveLeft();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38: // 如果用户按下了 ↑
			if( canMoveUp( board ) ){
				moveUp();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39: //如果用户按下了 →
			if( canMoveRight( board ) ){
				moveRight();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40: //如果用户按下了 ↓
			if( canMoveDown( board ) ){
				moveDown();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
		default: break;
	}
});

var isGameOver = function() {
	if( noSpace( board ) && !canMove( board ) ){
		gameOver();
	}
};

// 往左移动
var moveLeft = function() {
	for ( var i=0; i<4; ++i){
		for ( var j=1; j<4; ++j){
			if ( board[i][j]!=0 ){
				for ( var k=0; k<j; ++k){
					if( board[i][k]==0 && noBarriersHorizontal(i,j,k,board)){
						//move
						moveAnimate(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k]==board[i][j] && noBarriersHorizontal(i,j,k,board) && isMerged[i][k]==0) {
						//move 
						moveAnimate(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore( score );
						//merge
						isMerged[i][k] = 1;
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()", 200);
};

// 往上移动
var moveUp = function() {
	for ( var j=0; j<4; ++j){
		for ( var i=1; i<4; ++i){
			if ( board[i][j]!=0 ){
				for ( var k=0; k<i; ++k){
					if( board[k][j]==0 && noBarriersVertical(j,i,k,board)){
						//move
						moveAnimate(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j]==board[i][j] && noBarriersVertical(j,i,k,board) && isMerged[k][j]==0) {
						//move 
						moveAnimate(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updateScore( score );
						//merge
						isMerged[k][j] = 1;						
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()", 200);
};

// 往右移动
var moveRight = function() {
	for ( var i=0; i<4; ++i){
		for ( var j=2; j>=0; --j){
			if ( board[i][j]!=0 ){
				for ( var k=3; k>j; --k){
					if( board[i][k]==0 && noBarriersHorizontal(i,k,j,board)){
						//move
						moveAnimate(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k]==board[i][j] && noBarriersHorizontal(i,k,j,board) && isMerged[i][k]==0) {
						//move 
						moveAnimate(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore( score );
						//merge
						isMerged[i][k] = 1;
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()", 200);
};

// 往下移动
var moveDown = function() {
	for ( var j=0; j<4; ++j){
		for ( var i=2; i>=0; --i){
			if ( board[i][j]!=0 ){
				for ( var k=3; k>i; --k){
					if( board[k][j]==0 && noBarriersVertical(j,k,i,board)){
						//move
						moveAnimate(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j]==board[i][j] && noBarriersVertical(j,k,i,board) && isMerged[k][j]==0 ) {
						//move 
						moveAnimate(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore( score );
						//merge
						isMerged[k][j] = 1;						
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()", 200);
};

var prepareForMobile = function() {
	if( documentWidth > 500 ){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	$('#grid-container').css({
		'width':gridContainerWidth - 2*cellSpace,
		'height':gridContainerWidth - 2*cellSpace,
		'padding':cellSpace,
		'border-radius':0.02*gridContainerWidth
	})
	$(".grid-cell").css({
		'width':cellSideLength,
		'height':cellSideLength,
		'border-radius':0.02*cellSideLength
	})
	
};

var startx = 0, starty = 0, endx = 0, endy = 0;

document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var dx = endx - startx;
	var dy = endy - starty;
	if( Math.abs(dx) < 0.1*documentWidth && Math.abs(dy) < 0.1*documentWidth){
		return ;
	}
	if( Math.abs( dx ) >= Math.abs( dy ) ){
		if( dx > 0 ){
			if( canMoveRight( board ) ){
				moveRight();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
		} else {
			if( canMoveLeft( board ) ){
				moveLeft();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	} else {
		if( dy > 0 ){
			if( canMoveDown( board ) ){
				moveDown();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
		} else {
			if( canMoveUp( board ) ){
				moveUp();
				setTimeout("putOneNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
});


