class Camera {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.movePos = createVector(x, y);
    }

    moveTo(pos) {
        this.move = true;
        this.movePos.set(pos);
    }

    update() {
        if (this.move) {
            var delta = p5.Vector.sub(this.movePos, this.pos);
            var dist = delta.mag();
            if (dist > 1) {
                this.vel.set(p5.Vector.div(delta, 20));
                this.pos.add(this.vel);
            } else {
                this.move = false;
            }
        }
    }

    apply() {
        translate(width/2-this.pos.x, height/2-this.pos.y);
    }
}