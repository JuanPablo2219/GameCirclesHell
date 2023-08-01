let time = new Date();
let deltaTime = 0;

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Initialize, 1);
} else {
    document.addEventListener("DOMContentLoaded", Initialize);
}

function Initialize() {
    time = new Date();
    Start();
    GameLoop();
}

function GameLoop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();
    Update();
    requestAnimationFrame(GameLoop);
}

let groundY = 22;
let velY = 0;
let impulse = 900;
let gravity = 2500;

const playerPosX = 42;
let playerPosY = groundY;

let groundX = 0;
let groundVel = 1280 / 3;
let gameVel = 1;
let score = 0;

let isStopped = false;
let isJumping = false;

let timeToObstacle = 2;
let minObstacleTime = 0.7;
let maxObstacleTime = 1.8;
let obstaclePosY = 16;
let obstacles = [];

let timeToCloud = 0.5;
let minCloudTime = 0.7;
let maxCloudTime = 2.7;
let maxCloudY = 270;
let minCloudY = 100;
let clouds = [];
let cloudVel = 0.5;

let container;
let player;
let scoreText;
let ground;
let gameOver;

function Start() {
    gameOver = document.querySelector(".game-over");
    ground = document.querySelector(".ground");
    container = document.querySelector(".container");
    scoreText = document.querySelector(".score");
    player = document.querySelector(".player");
    document.addEventListener("keydown", HandleKeyDown);
}

function Update() {
    if (isStopped) return;

    MovePlayer();
    MoveGround();
    DecideCreateObstacles();
    DecideCreateClouds();
    MoveObstacles();
    MoveClouds();
    DetectCollision();

    velY -= gravity * deltaTime;
}

function HandleKeyDown(ev) {
    if (ev.keyCode == 32) {
        Jump();
    }
}

function Jump() {
    if (playerPosY === groundY) {
        isJumping = true;
        velY = impulse;
        player.classList.remove("player-running");
    }
}

function MovePlayer() {
    playerPosY += velY * deltaTime;
    if (playerPosY < groundY) {
        TouchGround();
    }
    player.style.bottom = playerPosY + "px";
}

function TouchGround() {
    playerPosY = groundY;
    velY = 0;
    if (isJumping) {
        player.classList.add("player-running");
    }
    isJumping = false;
}

function MoveGround() {
    groundX += CalculateDisplacement();
    ground.style.left = -(groundX % container.clientWidth) + "px";
}

function CalculateDisplacement() {
    return groundVel * deltaTime * gameVel;
}

function Crash() {
    player.classList.remove("player-running");
    player.classList.add("player-crashed");
    isStopped = true;
}

function DecideCreateObstacles() {
    timeToObstacle -= deltaTime;
    if (timeToObstacle <= 0) {
        CreateObstacle();
    }
}

function DecideCreateClouds() {
    timeToCloud -= deltaTime;
    if (timeToCloud <= 0) {
        CreateCloud();
    }
}

function CreateObstacle() {

    let obstacle = document.createElement("div");
    container.appendChild(obstacle);
    obstacle.classList.add("cactus");

    if (Math.random() > 0.5) obstacle.classList.add("cactus2");
    obstacle.posX = container.clientWidth;
    obstacle.style.left = container.clientWidth + "px";

    obstacles.push(obstacle);
    timeToObstacle = minObstacleTime + Math.random() * (maxObstacleTime - minObstacleTime) / gameVel;
}

function CreateCloud() {

    let cloud = document.createElement("div");
    container.appendChild(cloud);
    cloud.classList.add("cloud");
    cloud.posX = container.clientWidth;
    cloud.style.left = container.clientWidth + "px";
    cloud.style.bottom = minCloudY + Math.random() * (maxCloudY - minCloudY) + "px";

    clouds.push(cloud);
    timeToCloud = minCloudTime + Math.random() * (maxCloudTime - minCloudTime) / gameVel;
}

function MoveObstacles() {

    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].posX < -obstacles[i].clientWidth) {
            obstacles[i].parentNode.removeChild(obstacles[i]);
            obstacles.splice(i, 1);
            GainPoints();
        } 
        else {
            obstacles[i].posX -= CalculateDisplacement();
            obstacles[i].style.left = obstacles[i].posX + "px";
        }
    }
}

function MoveClouds() {

    for (let i = clouds.length - 1; i >= 0; i--) {
        if (clouds[i].posX < -clouds[i].clientWidth) {
            clouds[i].parentNode.removeChild(clouds[i]);
            clouds.splice(i, 1);
        } 
        else {
            clouds[i].posX -= CalculateDisplacement() * cloudVel;
            clouds[i].style.left = clouds[i].posX + "px";
        }
    }
}

/*function GainPoints() {
    score++;
    scoreText.innerText = score;
    if (score == 5) {
        gameVel = 1.5;
    } else if (score == 10) {
        gameVel = 2;
    } else if (score == 20) {
       gameVel = 3;
    }
    ground.style.animationDuration = (3 / gameVel) + "s";
}
*/
function GainPoints() {
    score++;
    scoreText.innerText = score;
    if (score == 5) {
      gameVel = 1.5;
    } else if (score == 10) {
      gameVel = 2;
    } else if (score == 20) {
      pausarJuegoYGanaste();
    }
  }
  
  function pausarJuegoYGanaste() {
    pausarJuego();
    showButtonWin();
  }
  
  function pausarJuego() {
    isStopped = true;
  }
  
  function showButtonWin() {
    let botonWin = document.getElementById("bnWin");
    botonWin.style.display = "block";
    botonWin.addEventListener("click", function () {
      window.location.href = "start.html"; 
    });
  }
  
function GameOver() {
    Crash();
    gameOver.style.display = "block";
}

function DetectCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].posX > playerPosX + player.clientWidth) {
            break; 
        } else {
            if (IsCollision(player, obstacles[i], 10, 30, 15, 20)) {
                GameOver();
            }
        }
    }
}

function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}

  /*function aumentarPuntaje() {
    score++;
    if (score === 10) {
      mostrarBotonContinuar();
    }
  }
  function mostrarBotonContinuar() {
    let botonContinuar = document.getElementById("btn-continuar");
    botonContinuar.style.display = "block";
    botonContinuar.addEventListener("click",
     function() {
              window.location.href = "otra_pagina.html";
    });
  }*/
