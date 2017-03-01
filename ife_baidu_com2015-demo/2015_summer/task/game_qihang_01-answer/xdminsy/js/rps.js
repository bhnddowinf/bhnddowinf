var enemyChoise = null;
var yourChoise = null;
var times = 0;
var inter;
var ing = false;
window.onload = function(){
	inter = setInterval(function(){
		setEnemy(enemyChoise=["paper","rock","scissor"][parseInt(Math.random() * 3)]);
	},120);
}
function setEnemy(choise){
	document.getElementById("enemy").querySelector('img').setAttribute("src", "img/" + choise + ".jpg");
}
function choose(choise){
	// clearInterval(inter);
	if(ing){
		return;
	}
	ing = true;
	yourChoise = choise;
	var ec = enemyChoise;
	document.getElementById("yourChoise").setAttribute('src', "img/" + yourChoise + ".jpg");
	document.getElementById("enemyChoise").setAttribute('src', "img/" + ec + ".jpg");
	var outcome = "Tie";
	if(choise === ec){
		outcome = "Tie";
	}else if(choise === "paper"){
		if(ec === "rock"){
			outcome = "You win!";
		}else{
			outcome = "You lose";
		}
	}else if(choise === "rock"){
		if(ec === "scissor"){
			outcome = "You win!";
		}else{
			outcome = "You lose";
		}
	}else if(choise === "scissor"){
		if(ec === "paper"){
			outcome = "You win!";
		}else{
			outcome = "You lose";
		}
	}
	document.getElementById("outcome").innerHTML = "Outcome:" + outcome;
	if(outcome === "You win!"){
		times++;
		document.getElementById("times").innerHTML = times;
	}
	document.getElementById("result").style.display = 'block';
	ing = false;
}
