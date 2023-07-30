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
