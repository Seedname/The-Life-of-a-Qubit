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
        // this.lines.push(new Rect(x, y, w, h));
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

    spike(x, y, s) {
        this.lines.push(new Spike(x, y, s));
        this.funcs.push({func: triangle, args: [x-s/2, y, x+s/2, y, x, y-s]});
    }

    func(f, start, stop, inc) {
        this.funcs.push({func: beginShape, args: []});
        this.funcs.push({func: vertex, args: [start, f(start)]});
        for (var i = start; i < stop; i += inc) {
            this.lines.push(new Line(i, f(i), i + inc, f(i + inc)));
            this.funcs.push({func: vertex, args: [i+inc, f(i+inc)]});
        }
        this.funcs.push({func: endShape, args: []});
    }

    para(x, y, start, stop, inc, xShift, yShift) {
        this.funcs.push({func: beginShape, args: []});
        this.funcs.push({func: vertex, args: [x(start)+xShift, y(start)+yShift]});
        for (var i = start; i < stop; i += inc) {
            this.lines.push(new Line(x(i) + xShift, y(i) + yShift, x(i + inc) + xShift, y(i + inc) + yShift));
            this.funcs.push({func: vertex, args: [x(i+inc) + xShift, y(i+inc) + yShift]});
        }
        this.funcs.push({func: endShape, args: []});
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

    noFill() {
        this.funcs.push({func: noFill, args: []});
    }

    // textSize(size) {
    //     this.funcs.push({func: textSize, args: [size]});
    // }

    // textAlign(hAlign, vAlign) {
    //     this.funcs.push({func: textAlign, args: [hAlign, vAlign]});
    // }

    // text(string, x, y) {
    //     this.funcs.push({func: text, args: [string, x, y]});
    // }

    display() {
        for (var i = 0; i < this.funcs.length; i++) {
            this.funcs[i].func.apply(this, this.funcs[i].args);
        }
    }

    collide(player) {
        for (var i = 0; i < this.lines.length; i++) {
            player.collide(this.lines[i]);
        }
    }
}