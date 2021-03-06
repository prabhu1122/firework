/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fireworks = [];
var star = [];
var col = ['#2216ef', '#16ef22', '#ef2216', '#ef16e3', '#e3ef16', '#8f16ef'];
var bomb;
var btn;
var data = false;
let img;
let angle = 0;


function setup() {
    createCanvas(displayWidth, displayHeight - 82);
    background(0);
    for (var i = 0; i < 200; i++) {
        star.push(new Star(random(width), random(height)));
    }
    bomb = loadSound("libs/Blast.mp3");
    angleMode(DEGREES);
    img = loadImage("libs/loading.png");
}

function draw() {
    frameRate(60);
    for (var i in star) {
        star[i].stars();
    }
    background(0, 20);
    if (random(1) < .03) {
        fireworks.push(new Firework());
    }
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].show();
        fireworks[i].update();
        if (fireworks[i].dead()) {
            fireworks.splice(i, 1);
        }
    }
}

