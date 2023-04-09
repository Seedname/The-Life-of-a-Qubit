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
            }
        }
    
        var rel = p5.Vector.sub(c, this.e1);
        var sD = p5.Vector.div(rel, dot);
        var u = p5.Vector.dot(sD, delta);
    
        u = constrain(u, 0, 1);
        if (u == 0 || u == 1) return;
    
        var pos = p5.Vector.add(this.e1, p5.Vector.mult(delta, u));
        var D = p5.Vector.sub(pos, c);
        
        if (p5.Vector.dot(D, D) <= sq(r)) {
            var delta = p5.Vector.sub(this.e2, this.e1);
            var normal;
            
            if (delta.x > delta.y) {
                if (pos.y > c.y) {
                    normal = createVector(delta.y, -delta.x);
                } else {
                    normal = createVector(-delta.y, delta.x);
                }
            } else {
                if (pos.x > c.x) {
                    normal = createVector(-delta.y, delta.x);
                } else {
                    normal = createVector(delta.y, -delta.x);
                }
            }
            
            normal.normalize();
            return p5.Vector.add(pos, p5.Vector.mult(normal, r));
        }
    }

    display() {
        stroke(0);
        line(this.e1.x, this.e1.y, this.e2.x, this.e2.y);
    }
}