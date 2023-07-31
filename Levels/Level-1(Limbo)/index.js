import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 515;

const bulletController = new BulletController(canvas);
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController
);

const enemies = [

  new Enemy(120, 20, "white", 4,),
  // new Enemy(220, 20, "white", 5,),
  new Enemy(320, 20, "white", 9),
  new Enemy(420, 20, "white", 6),
  new Enemy(520, 20, "white", 5),
  new Enemy(620, 20, "white", 7),
  // new Enemy(720, 20, "white", 9),
  new Enemy(820, 20, "white", 4),
  
  // fila 2
  new Enemy(120, 100, "white", 8),
  new Enemy(220, 100, "white", 3),
  // new Enemy(320, 100, "white", 7),
  new Enemy(420, 100, "white", 5),
  new Enemy(520, 100, "white", 3),
  // new Enemy(620, 100, "white", 7),
  new Enemy(720, 100, "white", 9),
  new Enemy(820, 100, "white", 5),  
];

// temporizador

const TIMEFULL = 120;
export let timeRest;
let temporizate;

function comenzarJuego() {
  timeRest = TIMEFULL;
  document.getElementById("second").textContent = timeRest;

  temporizate = setInterval(function () {
    timeRest--;
    document.getElementById("second").textContent = timeRest;

    if (timeRest <= 0) {
      clearInterval(temporizate);
      
      timeRest = TIMEFULL;

      temporizate = setInterval(null, 100 / 60);
    }
  }, 100);

  return TIMEFULL
}


document.getElementsByTagName("button")['0'].disabled = true;
document.getElementById("second");
comenzarJuego();


function gameLoop() {
  setCommonStyle();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);
  enemies.forEach((enemy) => {
    if (bulletController.collideWith(enemy)) {
      if (enemy.health <= 0) {
        const index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
      }
    } else {
      enemy.draw(ctx);
    }
  });
}


function setCommonStyle() {
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);
