function circleLine(e1, e2, c, r) {
    var delta = p5.Vector.sub(e2, e1);

    var dot = p5.Vector.dot(delta, delta);
    
    if (dot == 0) {
        if (delta.x == 0 && delta.y === 0) {
            let vector = p5.Vector.sub(e1, c);
            print(true);
            return p5.Vector.dot(vector, vector);
        }
    }

    var rel = p5.Vector.sub(c, e1);
    var sD = p5.Vector.div(rel, dot);
    var u = p5.Vector.dot(sD, delta);

    u = constrain(u, 0, 1);
    
    var pos = p5.Vector.add(e1, p5.Vector.mult(delta, u));
    var D = p5.Vector.sub(pos, c);
    
    if (p5.Vector.dot(D, D) <= sq(r/2)) {
        return pos;
    }
}

class Player {
    constructor(x, y, r, controls) {
        this.pos = createVector(x, y);
        this.old = createVector(x, y);
        this.acc = createVector(0, 0);

        this.r = r;
        this.angle = 0;
        this.angleVel = 0;

        this.touchingFloor = false;

        this.controls = controls;
        this.scales = createVector(1, 1);

    }

    update(dt) {
        this.touchingFloor = false;
        var vel = p5.Vector.sub(this.pos, this.old);
        this.old.set(this.pos);
        
        this.pos.add(vel);
        this.pos.add(p5.Vector.mult(this.acc, dt*dt));

        this.acc.set(0, 0);
    }
    
    accelerate(acc) {
        this.acc.add(acc);
    }

    move(keys) {
        if (keys[this.controls[0]] && this.touchingFloor) {
        // if (keys[this.controls[0]] ) {
            this.accelerate(createVector(0, -5));
            // this.old = createVector(this.pos.x, this.pos.y+5)
        }
        if (keys[this.controls[1]]) {
            this.accelerate(createVector(0, 0.1));
        }
        if (keys[this.controls[2]]) {
            this.angleVel -= 0.0015;
            // this.angle -= 0.05
            this.accelerate(createVector(-0.1, 0));
        }
        if (keys[this.controls[3]]) {
            // this.angle += 0.05;
            this.angleVel += 0.0015;
            this.accelerate(createVector(0.1, 0));
        }
    }

    constrain() {
        // this.acc.limit(3)
        if(this.pos.x + this.r > width) {
            this.pos.x = width-this.r;
            this.angleVel = 0;
        } else if(this.pos.x-this.r < 0) {
            this.pos.x = this.r;
            this.angleVel = 0;
        }

        if(this.pos.y + this.r > height) {
            this.pos.y = height-this.r;
            this.touchingFloor = true;
        } else if(this.pos.y-this.r < 0) {
            this.pos.y = this.r;
        }
    }

    collide(line) {
        var result = circleLine(line.e1, line.e2, this.pos, 2*this.r)
        if (result) {
            var delta = p5.Vector.sub(line.e2, line.e1);
            var normal;
            // if (result.y > this.pos.y) {
            //     normal = createVector(delta.y, -delta.x);
            // } else {
            //     normal = createVector(-delta.y, delta.x);
            // }
            if (result.x > this.pos.x) {
                normal = createVector(-delta.y, delta.x);
            } else {
                normal = createVector(delta.y, -delta.x);
            }
            normal.normalize();
            // this.old.set(p5.Vector.add(result, p5.Vector.mult(normal, this.r)));
            this.pos.set(p5.Vector.add(result, p5.Vector.mult(normal, this.r)));
            this.touchingFloor = true;
        }
    }

    display() {
        this.angle += this.angleVel;
        fill(255, 255, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2 * this.r * this.scales.x, 2 * this.r * this.scales.y)

        // push();
        // translate(this.pos.x, this.pos.y);
        // rotate(this.angle);

        // stroke(0);
        // noFill();
        // strokeWeight(4);
        // arc(0, 0, this.r, this.r, 0, PI);

        // fill(0);
        // noStroke();
        // ellipse(-this.r/4, -this.r/2, 5, 5);
        // ellipse(this.r/4, -this.r/2, 5, 5);
        // pop();
    }
}
