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
