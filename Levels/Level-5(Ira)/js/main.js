
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
function drawshotsenemies(){
	for (const i in shotsenemies){
		let Shooting = shotsenemies[i];
		ctx.save();
		ctx.fillStyle = 'yellow';
		ctx.fillRect(Shooting.x, Shooting.y, Shooting.width, Shooting.height);
		ctx.restore();
	}
}
function moveshotsenemies(){
	for(const i in shotsenemies){
		let Shooting = shotsenemies[i];
		Shooting.y += 2;
	}
	shotsenemies = shotsenemies.filter(function(Shooting){
		return Shooting.y < canvas.height;
	});
}

function updateenemies(){
	function addshotsenemies(){
		return{
			x: enemy.x,
			y: enemy.y,
			width:10,
			height:33,
			counter: 0
		}
	}
	
	if(juego.state == 'iniciando'){
		for ( let i= 0; i<10; i++){
			enemies.push({
				x: 10 + (i*50),
				y: 10,
				height: 40,
				width: 40,
				state: 'vivo',
				counter: 0
			});
		}
		juego.state = 'jugando';
	}
	for(const i in enemies){
		var enemy = enemies[i];
		if(!enemy) continue;
		if (enemy && enemy.state == 'vivo'){
			enemy.counter++;
			enemy.x += Math.sin(enemy.counter * Math.PI / 90)*5;

			if(aleatorio(0,enemies.length * 10 ) == 4){
				shotsenemies.push(addshotsenemies(enemy));
			}
		}
		if(enemy && enemy.state == 'hit'){
			enemy.counter++;
			if ( enemy.counter >= 20){
				enemy.state = 'muerto';
				enemy.counter = 0;
			}
		}
	}
	enemies = enemies.filter(function(enemy){
		if(enemy && enemy.state != 'muerto' ) return true;
		return false;
	});
}
function moveshots(){
	for (var i in shots) {
		var Shooting = shots[i];
		Shooting.y -= 2;
	}
	shots = shots.filter(function(Shooting){
		return Shooting.y > 0;
	});
}
function fire(){
	shots.push({
		x: ship.x + 20,
		y: ship.y + 10,
		width: 10,
		height: 30
	});
}
