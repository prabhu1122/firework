class Particale {
    constructor(x, y, explotion, col) {
        this.explotion = explotion;
        this.pos = createVector(x, y);
        this.life = 255;
        colorMode(RGB);
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

