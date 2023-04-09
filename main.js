var player, camera;
var lines = [];

function drawLine(func, start, stop, increment) {
    var lines = [];
    for (var i = start; i < stop; i += increment) {
        lines.push(new Line(i, func(i), i+increment, func(i + increment)));
    }
    return lines;
}

function drawRect(x, y, w, h, lines) {
    lines.push(new Line(x, y, x + w, y));
    lines.push(new Line(x, y, x, y + h));
    lines.push(new Line(x + w, y, x + w, y + h));
    lines.push(new Line(x, y + h, x + w, y + h));
}

function f(x) {
    // return 100 * Math.sin((x-width/2)/100) + height/2;
    var r = 300;
    return sqrt(sq(r) - sq(x-width/2)) + height/2;
}

function setup() {
    createCanvas(document.body.clientWidth, window.innerHeight);
    player = new Player(width/2, 30, 20, [32, 83, 65, 68]);
    // lines = drawLine(f, -300+width/2, 300+width/2, 30);

    drawRect(width/2-50, 100, 100, 100, lines);
    camera = new Camera(width/2, height/2);
    
    // lines = drawLine(f, 0, width, 50);
}

var keys = [];

function draw() {
    background(255);
    camera.moveTo(player.pos);
    camera.update();
    camera.apply();

    player.update();

    player.constrain();
    for (var i = 0; i < lines.length; i++) {
        player.collide(lines[i]);
        lines[i].display();
    }
    player.display();

    let gravity = createVector(0, 0.2);
    player.accelerate(gravity);
    if (keyPressed) {
        player.move(keys);
    }

    stroke(0)
    line(0, 0, 0, height);
    line(0, 0, width, 0);
    line(width, 0, width, height);
    line(0, height, width, height);
    
}


function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
}