class Line {
    constructor(x1, y1, x2, y2) {
        this.e1 = createVector(x1, y1);
        this.e2 = createVector(x2, y2);
    }

    collide(c, r) {
        var delta = p5.Vector.sub(this.e2, this.e1);
    
        var dot = p5.Vector.dot(delta, delta);
        
        if (dot == 0) {
            if (delta.x == 0 && delta.y === 0) {
                return;
                // let vector = p5.Vector.sub(this.e1, c);
                // return p5.Vector.dot(vector, vector);
            }
        }
    
        var rel = p5.Vector.sub(c, this.e1);
        var sD = p5.Vector.div(rel, dot);
        var u = p5.Vector.dot(sD, delta);
    
        u = constrain(u, 0, 1);
        if (u == 0 || u == 1) return;
    
        var pos = p5.Vector.add(this.e1, p5.Vector.mult(delta, u));
        var D = p5.Vector.sub(pos, c);
        
        if (p5.Vector.dot(D, D) <= sq(r/2)) {
            return pos;
        }
    }

    display() {
        stroke(0);
        line(this.e1.x, this.e1.y, this.e2.x, this.e2.y);
    }
}