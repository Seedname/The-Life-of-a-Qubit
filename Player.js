class Player {
    constructor(x, y, r, controls) {
        this.pos = createVector(x, y);
        this.old = createVector(x, y);
        this.acc = createVector(0, 0);

        this.boost = 0;

        this.r = r;
        this.angle = 0;

        this.touchingFloor = false;

        this.controls = controls;
        this.scales = createVector(1, 1);

    }

    update() {
        this.touchingFloor = false;
        var vel = p5.Vector.sub(this.pos, this.old);
        this.angle += vel.x;
        this.old.set(this.pos);
        
        this.pos.add(vel);
        this.pos.add(this.acc);

        this.acc.set(0, 0);
    }
    
    accelerate(acc) {
        this.acc.add(acc);
    }

    move(keys) {
        if (keys[this.controls[0]] && this.touchingFloor) {
        // if (keys[this.controls[0]] ) {
            // this.accelerate(createVector(0, -5));
            this.boost += 0.2;
            this.boost = constrain(this.boost, 0, 10);
            var velX = this.pos.x - this.old.x;
            if (abs(velX) > 1) {
                velX = velX/abs(velX);
            }
            this.old.x = this.pos.x-velX;
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

    release(keys) {
        if (!keys[this.controls[0]] && this.touchingFloor) {
                this.accelerate(createVector(0, -this.boost));
                this.boost = 0;
            }
    }

    constrain() {
        this.acc.limit(8);
        if(this.pos.x + this.r > 100000) {
            this.pos.x = width-this.r;
        } else if(this.pos.x-this.r < 0) {
            this.pos.x = this.r;
        }

        if (this.pos.y > 5000) {
            this.pos.set(100, 0);
            this.old.set(100, 0);
            this.angle = 0;
        }
    }

    collide(object) {
        var result = object.collide(this.pos, this.r);
        if (result) {
            this.pos.set(result);
            this.touchingFloor = true;
        }
    }

    display() {
        var angle = this.angle/60;
        fill(255, 255, 0);
        noStroke();
        
        let b = this.boost/3;

        ellipse(this.pos.x, this.pos.y + sq(b)/2, 2 * this.r - sq(b) * sin(angle % PI / 2), 2 * this.r - sq(b) * cos(angle % PI/2))

        push();
        translate(this.pos.x, this.pos.y + sq(b)/2);
        rotate(angle);
        
        stroke(0);
        noFill();
        strokeWeight(4);
        arc(0, 0, this.r, this.r - sq(b), 0, PI);

        fill(0);
        noStroke();
        ellipse(-this.r/4, -this.r/2 + sq(b)/4, 5, 5);
        ellipse(this.r/4, -this.r/2+ sq(b)/4, 5, 5);
        pop();
    }
}
