
class Particale {
    constructor(x, y, explotion, col) {
        this.explotion = explotion;
        this.pos = createVector(x, y);
        this.life = 255;
        colorMode(HSB);
        this.col = col;

        if (this.explotion){
            this.vel = createVector(random(-2, 2), random(-10, -7));
        } else {
          this.vel = p5.Vector.random2D();
          this.vel.mult(random(8));
          //this.vel = createVector(random(-7, 7), random(-7, 7));
        }
        this.acc = createVector(0, .1);
        this.show = function() {
            if (this.explotion) {
                strokeWeight(4);
                stroke(240, 10, 80);
            } else {
                strokeWeight(1);
                stroke(this.col, 200, 100,this.life);
            }
            point(this.pos.x, this.pos.y);
        }
        this.update = function() {
            if (!this.explotion) {
                this.life -= 5;
                this.vel.mult(0.97);
            }
            
                this.vel.add(this.acc);
                this.pos.add(this.vel);
        }

        this.dead = function() {
            if (this.life < 0) {
                return true;
            } else {
                return false;
            }
        }
    }
}

class Firework {
    constructor() {
        //shooting
        this.firework = new Particale(width / 2, height, true, random(255));
        this.exploded = false;
        this.particales = [];

        this.explotion = function() {
            bomb.play();
            for (var i = 0; i < 150; i++) {
                //spark
                this.particales.push(new Particale(this.firework.pos.x, this.firework.pos.y, false, random(255)));
            }
        }

        this.show = function() {
            if (!this.exploded) {
                this.firework.show();
            }
            for (var i = 0; i < this.particales.length; i++) {
                this.particales[i].show();
            }
        }

        this.dead = function() {
            if (this.particales.length === 0 && this.exploded) {
                return true;
            }
            else {
                return false;
            }
        }

        this.update = function() {
            if (!this.exploded) {
                this.firework.update();
                if (this.firework.vel.y >= 0) {
                    this.exploded = true;
                    this.explotion();
                }
            }
            for (var i = this.particales.length - 1; i >= 0; i--) {
                this.particales[i].update();
                if (this.particales[i].dead()) {
                    this.particales.splice(i, 1);
                }
            }
        }
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.stars = function() {
            strokeWeight(1);
            var intens = map(this.y, 0, height, 200, 0);
            stroke(intens);
            point(this.x, this.y);
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fireworks = [];
var star = [];
var col = ['#2216ef', '#16ef22', '#ef2216', '#ef16e3', '#e3ef16', '#8f16ef'];
var bomb;
var btn;
var data = false;

function preload() {
    bomb = loadSound("libs/Blast.mp3");
}

function setup() {
    createCanvas(displayWidth, displayHeight - 82);
    background(0);
    btn = createButton("Play/Pause");
    btn.position(2, height - 25);
    for (var i = 0; i < 200; i++) {
        star.push(new Star(random(width), random(height)));
    }
}

function draw() {

    for (var i in star) {
        star[i].stars();
    }
    
    function playPause(arg) {
        // body...
    }
    //btn.mousePressed(mouseClicked());

    if (data === true) {
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
}

function mouseClicked() {
    if (!data) {
        data = true;
    } else {
        data = false;
    }
}