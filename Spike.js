class Spike {
    constructor(x, y, s) {
        this.lines = [];
        this.lines.push(new Line(x-s/2, y, x+s/2, y));
        this.lines.push(new Line(x+s/2, y, x, y-s));
        this.lines.push(new Line(x, y-s, x-s/2, y));
    }
    collide (c, r) {
        for (var i = 0; i < this.lines.length; i++) {
            var result = this.lines[i].collide(c, r);
            if (result) {
                return createVector(100, 0);
            }
        }
    }
}