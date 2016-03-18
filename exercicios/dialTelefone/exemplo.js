var score = [0,0];
var player= "";
var ia = "";

var options = ["rock","paper","scizor"];

function init(){
	var num1 = document.getElementById("num1");
	var num2 = document.getElementById("num2");
	var num3 = document.getElementById("num3");
	var num4 = document.getElementById("num4");
	var num5 = document.getElementById("num5");
	var num6 = document.getElementById("num6");
	var num7 = document.getElementById("num7");
	var num8 = document.getElementById("num8");
	var num9 = document.getElementById("num9");
	var num0 = document.getElementById("num0");
	
	p1Rock.onclick = action;
	p1Paper.onclick = action;
	p1Scizor.onclick = action;
}

function iaPlay(){
	ia = options[Math.floor( Math.random()*3 )];
	var element = document.getElementById("p2_"+ia).className += " selected";
}

function action(event){
	zera();
	var choice = event.target;
	player = choice.id.split("_")[1];
	choice.className += " selected";
	iaPlay();
	check();
}

function zera(){
	var options = document.getElementsByClassName("option");
	for(var i=0; i< options.length; i++){
		console.log(options)
		options[i].className = "option";
	}
}

function check(){
	var result = document.getElementById("result").childNodes[0];
	if(ia==player){
		result.src="cat.jpg";
	}else if( (player == "rock" && ia == "paper") 
			|| (player == "paper" && ia == "scizor")
			|| (player == "scizor" && ia == "rock") ) {
		result.src="lose.jpg";
		score[1]++;
	}else{
		result.src="victory.jpg";
		score[0]++;
	}
	var scorep1;
}

window.onload = init;