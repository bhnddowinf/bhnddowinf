documentWidth = window.screen.availWidth/2;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

var getPosTop = function(i,j) {
	return cellSpace+i*(cellSpace+cellSideLength);
};

var getPosLeft = function(i,j) {
	return cellSpace+j*(cellSpace+cellSideLength);
};

//判断当前局势是否还有空位
var noSpace = function( board ) {
	for ( var i=0; i<4; ++i){
		for ( var j=0; j<4; ++j){
			if ( board[i][j]==0 ){
				return false;
			}
		}
	}
	return true;
};

// 获取一个数字的背景颜色
var getNumberBackgroundColor = function( number ) {
	var color = ["","#eff0c8","#efe4da","#f2bc79",
				"#f59563","#f67c5f","#f65e3b",
				"#edcf72","#98cd01","#33b5e5",
				"#0f98cd","#ab56cd","#983451"];
	var x = 0; for(x=0; number-1>0; ++x,number/=2);
	return color[x];
}

// 获取一个数字的颜色
var getNumberColor = function( number ) {
	if( number<=4 ){
		return "#786e65";
	}
	return "#fff";
};

// 判断当前局势是否能往左移动
var canMoveLeft = function( board ) {
	for ( var i=0; i<4; ++i){
		for (var j=1; j<4; ++j) {
			if( board[i][j]!=0 && (board[i][j-1]==0 || board[i][j-1]==board[i][j]) ){
				return true;
			}
		}
	}
	return false;
};

// 判断从某一行的某点到另一个点之间是否有格子
var noBarriersHorizontal = function( row, col1, col2, board ){
	for (var i=col2+1; i<col1; ++i){
		if( board[row][i]!=0 ){
			return false;
		}
	}
	return true;
}

// 判断当前局势是否能往上移动
var canMoveUp = function( board ) {
	for ( var j=0; j<4; ++j){
		for (var i=1; i<4; ++i) {
			if( board[i][j]!=0 && (board[i-1][j]==0 || board[i-1][j]==board[i][j])){
				return true;
			}
		}
	}
	return false;
};

// 判断从某一行的某点到另一个点之间是否有格子
var noBarriersVertical = function( col, row1, row2, board ){
	for (var i=row2+1; i<row1; ++i){
		if( board[i][col]!=0 ){
			return false;
		}
	}
	return true;
}

// 判断当前局势是否能往右移动
var canMoveRight = function( board ) {
	for ( var i=0; i<4; ++i){
		for (var j=2; j>=0; --j) {
			if( board[i][j]!=0 && (board[i][j+1]==0 || board[i][j+1]==board[i][j])){
				return true;
			}
		}
	}
	return false;
};


// 判断当前局势是否能往下移动
var canMoveDown = function( board ) {
	for ( var j=0; j<4; ++j){
		for (var i=2; i>=0; --i) {
			if( board[i][j]!=0 && (board[i+1][j]==0 || board[i+1][j]==board[i][j])){
				return true;
			}
		}
	}
	return false;
};

//判断当前局势是否能往四个方向移动
var canMove = function( board ) {
	if( canMoveLeft( board ) ||
		canMoveRight( board ) ||
		canMoveUp( board )||
		canMoveDown( board ) ){
		return true;
	}
	return false;
};
