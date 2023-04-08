class Player {
    constructor(x, y, r, controls) {
        this.pos = createVector(x, y);
        this.old = createVector(x, y);
        this.acc = createVector(0, 0);

        this.r = r;
        this.controls = controls;
    }

    update(dt) {
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
        if (keys[this.controls[0]]) {
            this.accelerate(createVector(0, -0.1));
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
        if(this.pos.x + this.r >= width) {
            this.pos.x = width-this.r;
        } else if(this.pos.x-this.r <= 0) {
            this.pos.x = this.r;
        }
        
        if(this.pos.y + this.r >= height) {
            this.pos.y = height-this.r;
        } else if(this.pos.y-this.r <= 0) {
            this.pos.y = this.r;
        }
    }

    display() {
        ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r)
    }
}
