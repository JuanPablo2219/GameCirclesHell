
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