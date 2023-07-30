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