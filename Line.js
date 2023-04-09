class Line {
    constructor(x1, y1, x2, y2) {
        this.e1 = createVector(x1, y1);
        this.e2 = createVector(x2, y2);
    }
    display() {
        stroke(0);
        line(this.e1.x, this.e1.y, this.e2.x, this.e2.y);
    }
}