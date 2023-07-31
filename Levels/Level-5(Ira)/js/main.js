
const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');

let ship = {
	x:100,
	y: canvas.height - 100,
	width: 50,
	height:50,
	counter:0
}
let juego = {
	state: 'iniciando'
};
let textresponse = {
	counter: -1,
	title: '',
	subtitle: ''
}
let keyboard = {};

let shots = [];
let shotsenemies = [];

let enemies = [];

let background;

function loadMedia(){

	background = new Image();
	background.src = 'imagenes/imagenjuego.jpg';
	background.onload = function(){
		let = window.setInterval(frameLoop, 1000/55);
	}
}
function drawenemies(){
	for(const i in enemies){
		let enemy = enemies[i];
		ctx.save();
		if(enemy.state == 'vivo') ctx.fillStyle = 'red';
		if(enemy.state == 'muerto') ctx.fillStyle = 'black';
		ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
		ctx.restore();
	}
}

function drawbackground(){
	ctx.drawImage(background,0,0);
}
function drawship(){
	ctx.save();
	ctx.fillStyle = 'white';
	ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
	ctx.restore();
}
function addeventskeyboard(){
	addevent(document,"keydown", function(e){

		keyboard[e.keyCode] = true;
		console.log(e.keyCode);
	});

	addevent(document,"keyup", function(e){

		keyboard[e.keyCode] = false;
	});
	function addevent(element, nombreevent, funcion){
		if (element.addEventListener) {

			element.addEventListener(nombreevent,funcion,false);
		} else if(element.attachEvent){

			element.attachEvent(nombreevent,funcion);
		}
	}
}

function moveship(){
	if (keyboard[37]) {

		ship.x -=6;
		if(ship.x < 0) ship.x = 0;
	} 
	if (keyboard[39]) {

		let limite = canvas.width - ship.width;
		ship.x +=6;
		if(ship.x > limite) ship.x = limite;
	}
	if(keyboard[32]){
		
		if(!keyboard.fire){
			fire();
			keyboard.fire = true;
		}
	} 
	else keyboard.fire = false;
	if(ship.state == 'hit'){
		ship.counter++;
		if(ship.counter >= 20){
			ship.counter = 0;
			ship.state = 'muerto';
			juego.state = 'perdido';
			textresponse.title ='juego Over';
			textresponse.subtitle = 'Presiona la tecla R para reiniciar';
			textresponse.counter = 0;
		}
	}
}