class Player {
    constructor(x, y, r, controls) {
        this.pos = createVector(x, y);
        this.old = createVector(x, y);
        this.acc = createVector(0, 0);

        this.r = r;
        this.angle = 0;

        this.touchingFloor = false;

        this.controls = controls;
        this.scales = createVector(1, 1);

    }

    update(dt) {
        this.touchingFloor = false;
        var vel = p5.Vector.sub(this.pos, this.old);
        this.angle += vel.x;
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
            // this.accelerate(createVector(5*cos(this.angle + PI/2), 5*sin(this.angle + PI)))
            // this.old = createVector(this.pos.x, this.pos.y+5)
        }
        if (keys[this.controls[1]]) {
            this.accelerate(createVector(0, 0.1));
        }
        if (keys[this.controls[2]]) {
            this.accelerate(createVector(-0.1, 0));
        }
        if (keys[this.controls[3]]) {
            this.accelerate(createVector(0.1, 0));
        }
    }

    constrain() {
        // this.acc.limit(3)
        if(this.pos.x + this.r > 100000) {
            this.pos.x = width-this.r;
        } else if(this.pos.x-this.r < 0) {
            this.pos.x = this.r;
        }
    }

    collide(line) {
        var result = line.collide(this.pos, 2*this.r);
        if (result) {
            var delta = p5.Vector.sub(line.e2, line.e1);
            var normal;
            
            if (delta.x > delta.y) {
                if (result.y > this.pos.y) {
                    normal = createVector(delta.y, -delta.x);
                } else {
                    normal = createVector(-delta.y, delta.x);
                }
            } else {
                if (result.x > this.pos.x) {
                    normal = createVector(-delta.y, delta.x);
                } else {
                    normal = createVector(delta.y, -delta.x);
                }
            }
            
            this.touchingFloor = true;
            normal.normalize();
            // this.old.set(p5.Vector.add(result, p5.Vector.mult(normal, this.r)));
            this.pos.set(p5.Vector.add(result, p5.Vector.mult(normal, this.r)));
            
        }
    }

    display() {
        fill(255, 255, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2 * this.r * this.scales.x, 2 * this.r * this.scales.y)

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle/60);

        stroke(0);
        noFill();
        strokeWeight(4);
        arc(0, 0, this.r, this.r, 0, PI);

        fill(0);
        noStroke();
        ellipse(-this.r/4, -this.r/2, 5, 5);
        ellipse(this.r/4, -this.r/2, 5, 5);
        pop();
    }
}
