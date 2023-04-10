class Line {
    constructor(x1, y1, x2, y2) {
        this.e1 = createVector(x1, y1);
        this.e2 = createVector(x2, y2);
    }

    collide(c, r) {
        var delta = p5.Vector.sub(this.e2, this.e1);
        var deltaMagSq = delta.magSq();
    
        if (deltaMagSq == 0) {
            if (c.dist(this.e1) <= r) {
                var normal = p5.Vector.sub(c, this.e1);
                normal.normalize();
                return p5.Vector.add(this.e1, p5.Vector.mult(normal, r));
            }
            return;
        }
    
        var rel = p5.Vector.sub(c, this.e1);
        var u = p5.Vector.dot(rel, delta) / deltaMagSq;
        u = constrain(u, 0, 1);
    
        var pos = p5.Vector.add(this.e1, p5.Vector.mult(delta, u));
        var D = p5.Vector.sub(pos, c);
    
        if (p5.Vector.dot(D, D) <= sq(r)) {
            if (D.magSq() <= deltaMagSq && u > 0 && u < 1) {
                var normal = p5.Vector.sub(c, pos);
                normal.normalize();
                return p5.Vector.add(pos, p5.Vector.mult(normal, r));
            }
            else if (c.dist(this.e1) <= r) {
                var normal = p5.Vector.sub(c, this.e1);
                normal.normalize();
                return p5.Vector.add(this.e1, p5.Vector.mult(normal, r));
            }
            else if (c.dist(this.e2) <= r) {
                var normal = p5.Vector.sub(c, this.e2);
                normal.normalize();
                return p5.Vector.add(this.e2, p5.Vector.mult(normal, r));
            }
        }
    }
    
    
    display() {
        stroke(0);
        line(this.e1.x, this.e1.y, this.e2.x, this.e2.y);
    }
}