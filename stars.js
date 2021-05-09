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

