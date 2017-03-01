var srcArr = ["./img/jiandao.jpg", "./img/shitou.jpg", "./img/bu.jpg"];

function getRandom () {
	return Math.floor(Math.random()*3);
}

var shearPic = new Image();
shearPic.src = "./img/jiandao.jpg";
var shearBtn = document.getElementById("shear");
shearBtn.onclick = function() {
	compare(0);
};
shearBtn.appendChild(shearPic);

var stonePic = new Image();
stonePic.src = "./img/shitou.jpg";
var stoneBtn = document.getElementById("stone");
stoneBtn.onclick = function() {
	compare(1);
};
stoneBtn.appendChild(stonePic);

var clothPic = new Image();
clothPic.src = "./img/bu.jpg";
var clothBtn = document.getElementById("cloth");
clothBtn.onclick = function() {
	compare(2);
};
clothBtn.appendChild(clothPic);
var usr = document.getElementById("choice");
var ran = document.getElementById("random");
var logNum = 1;
var tieNum = 0;
var winNum = 0;
var losNum = 0;

function compare (usrChoice) {
	var randomX = getRandom();
	usr.src = srcArr[usrChoice];
	ran.src = srcArr[randomX];
	var log = document.getElementById("log");
	var logs = document.createElement("p");
	if(randomX == usrChoice){
		logs.innerText = "平局了!你和电脑出的都是:"+getName(usrChoice);
		++tieNum;
	}else if((randomX==2 && usrChoice==0)
		||(randomX==1 && usrChoice==2)
		||(randomX==0 && usrChoice==1)){
		logs.innerText = "你赢了!你出的是:"+getName(usrChoice)+", 而电脑出的是:"+getName(randomX);
		++winNum;
	}else{
		logs.innerText = "你输了!你出的是:"+getName(usrChoice)+", 而电脑出的是:"+getName(randomX);
		++losNum;
	}
	++logNum;
	if(logNum>10){
		log.removeChild(log.getElementsByTagName("p")[2]);
	}
	log.appendChild(logs);
	document.getElementById("win").innerText=winNum;
	document.getElementById("tie").innerText=tieNum;
	document.getElementById("los").innerText=losNum;
}

function getName(choice){
	if(choice == 0){
		return "剪刀";
	}
	if(choice == 1){
		return "石头";
	}
	if(choice == 2){
		return "布";
	}
}