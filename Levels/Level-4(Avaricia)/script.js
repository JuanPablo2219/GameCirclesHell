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

