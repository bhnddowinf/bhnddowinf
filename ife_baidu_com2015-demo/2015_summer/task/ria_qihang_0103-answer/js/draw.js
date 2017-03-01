var Draw = {
	mouseDown:false,
	oldPoint:{x:0,y:0},
	originPoint:{x:0,y:0},
	eraserSize:1,
	mode:'draw',
	canvasSize:{
			width:0,
			height:0
	}
};

Draw.init = function(){
	var canvas = document.getElementById('palette');
	var cxt = canvas.getContext('2d');
	cxt.fillStyle = '#333';
	cxt.lineWidth = 1;
	Draw.cxt = cxt;
	Draw.originPoint = {
		x:canvas.offsetLeft,
		y:canvas.offsetTop
	};
	Draw.canvasSize.width = canvas.parentNode.offsetWidth*0.9;
	Draw.canvasSize.height = canvas.parentNode.offsetHeight;
	canvas.width = Draw.canvasSize.width;
	canvas.height = Draw.canvasSize.height;
};

Draw.convertPoint = function(point){
	return {
		x:point.x-Draw.originPoint.x,
		y:point.y-Draw.originPoint.y
	};
};

Draw.draw = function(point){
	var oldPoint = Draw.convertPoint(Draw.oldPoint);
	point = Draw.convertPoint(point);
	var path=new Path2D();
	path.moveTo(oldPoint.x,oldPoint.y);
	path.lineTo(point.x,point.y);
	Draw.cxt.stroke(path);
};

Draw.eraser = function(point){
	point = Draw.convertPoint(point);
	var width = 10+Draw.eraserSize*4;
	Draw.cxt.clearRect(point.x-width/2,point.y-width/2,width,width);
};

Draw.drawImage = function(image){
	Draw.cxt.drawImage(image,0,0,Draw.canvasSize.width,Draw.canvasSize.height);
};