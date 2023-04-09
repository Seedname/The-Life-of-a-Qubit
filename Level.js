class Level {
    constructor() {
        this.lines = [];
        this.funcs = [];
    }

    rect(x, y, w, h) {
        this.lines.push(new Line(x, y, x + w, y));
        this.lines.push(new Line(x, y, x, y + h));
        this.lines.push(new Line(x + w, y, x + w, y + h));
        this.lines.push(new Line(x, y + h, x + w, y + h));
        this.funcs.push({func: rect, args: [x, y, w, h]});
    }
    
    triangle(x1, y1, x2, y2, x3, y3) {
        this.lines.push(new Line(x1, y1, x2, y2));
        this.lines.push(new Line(x2, y2, x3, y3));
        this.lines.push(new Line(x3, y3, x1, y1));
        this.funcs.push({func: triangle, args: [x1, y1, x2, y2, x3, y3]});
    }

    quad(x1, y1, x2, y2, x3, y3, x4, y4) {
        this.lines.push(new Line(x1, y1, x2, y2));
        this.lines.push(new Line(x2, y2, x3, y3));
        this.lines.push(new Line(x3, y3, x4, y4));
        this.lines.push(new Line(x4, y4, x1, y1));
        this.funcs.push({func: quad, args: [x1, y1, x2, y2, x3, y3, x4, y4]});
    }

    line(x1, y1, x2, y2) {
        this.lines.push(new Line(x1, y1, x2, y2));
        this.funcs.push({func: line, args: [x1, y1, x2, y2]});
    }

    func(f, start, stop, inc) {
        for (var i = start; i < stop; i += inc) {
            lines.push(new Line(i, f(i), i + inc, func(i + inc)));
        }
    }

    fill(r, g, b) {
        this.funcs.push({func: fill, args: [r, g, b]});
    }

    stroke(r, g, b) {
        this.funcs.push({func: stroke, args: [r, g, b]});
    }

    noStroke() {
        this.funcs.push({func: noStroke, args: []});
    }

    collide(player) {
        for (var i = 0; i < this.funcs.length; i++) {
            this.funcs[i].func.apply(this, this.funcs[i].args);
        }

        for (var i = 0; i < this.lines.length; i++) {
            player.collide(this.lines[i]);
            // this.lines[i].display();
        }
    }
}