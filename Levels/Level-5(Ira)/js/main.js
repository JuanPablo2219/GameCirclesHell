
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
function drawshots(){
	ctx.save();
	ctx.fillStyle = 'black';
	for ( var i in shots){
		var Shooting = shots[i];
		ctx.fillRect(Shooting.x, Shooting.y, Shooting.width, Shooting.height);
	}
	ctx.restore();
}
function drawtext(){
	if(textresponse.counter == -1) return;
	let alpha = textresponse.counter/50.0;
	if(alpha>1){
		for(let i in enemies){
			delete enemies[i];
		}
	}
	ctx.save();
	ctx.globalAlpha = alpha;
	if(juego.state == 'perdido'){
		ctx.fillStyle = 'black';
		ctx.font = '40pt Arial';
		ctx.fillText(textresponse.title, 140, 100);
		ctx.font = '20pt Arial';
		ctx.fillText(textresponse.subtitle, 100, 150);
	}
	if(juego.state == 'victoria'){
		ctx.fillStyle = 'black';
		ctx.font = '40pt Arial';
		ctx.fillText(textresponse.title, 140, 70);
		ctx.font = '20pt Arial';
		ctx.fillText(textresponse.subtitle, 100, 180);
	}
	ctx.restore();
}

function updaterstateJuego(){
	if(juego.state == 'jugando' && enemies.length == 0){
		juego.state = 'victoria';
		textresponse.title = 'Derrotaste a los enemies';
		textresponse.subtitle = 'Presiona la tecla R para reiniciar';
		textresponse.counter = 0;
	}
	if(textresponse.counter >= 0){
		textresponse.counter++;
	}
	if ((juego.state == 'perdido' || juego.state == 'victoria') && keyboard[82]){
		juego.state = 'iniciando';
		ship.state = 'vivo';
		textresponse.counter = -1;
	}
}
function hit(a,b){
	let hit = false;
	if(b.x + b.width >= a.x && b.x < a.x + a.width){
		if(b.y + b.height >= a.y && b.y  < a.y + a.height){
			hit = true;
		}
	}
	if(b.x <= a.x && b.x + b.width >= a.x + a.width){
		if( b.y <= a.y && b.y + b.height >= a.y + a.height){
			hit = true;
		}
	}
	if(a.x <= b.x && a.x + a.width >= b.x + b.width){
		if( a.y <= b.y && a.y + a.height >= b.y + b.height){
			hit = true;
		}
	}
	return hit;
}
function verifycontact(){
	for(let i in shots){
		let Shooting = shots[i];
		for(j in enemies){
			let enemy = enemies[j];
			if(hit(Shooting,enemy)){
				enemy.state = 'hit';
				enemy.counter = 0;
			}
		}
	}
	if(ship.state == 'hit' || ship.state == 'muerto') return; 
	for(let i  in shotsenemies){
		let Shooting = shotsenemies[i];
		if (hit(Shooting, ship)){
			ship.state = 'hit';
			console.log('contact');
		}
	}
}


function aleatorio(lower, upper){
	let odds = upper - lower;
	let a = Math.random() * odds;
	a = Math.floor(a);
	return parseInt(lower) + a;
}

function frameLoop(){
	updaterstateJuego();
	moveship();
	moveshots();
	moveshotsenemies();
	drawbackground();
	verifycontact();
	updateenemies();

	drawenemies();
	drawshotsenemies();
	drawshots();
	drawtext();
	drawship();
}


window.addEventListener('load', init);
function init(){
	addeventskeyboard();
	loadMedia();
}
