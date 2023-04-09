var player, camera, levels;
var level;

function setup() {
    createCanvas(document.body.clientWidth, window.innerHeight);
    player = new Player(100, 0, 20, [32, 83, 65, 68]);
    camera = new Camera(100, 0);

    level = new Level();

    level.fill(0, 0, 0);
    level.noStroke();
    level.rect(-50, 40, 1000, height-40);
    level.triangle(950, 40, 2000, height, 950, height);
}

var keys = [];

function draw() {
    background(128);
    camera.moveTo(player.pos);
    camera.update();
    camera.apply();

    player.update();
    player.constrain();
    level.collide(player);
    player.display();

    let gravity = createVector(0, 0.2);
    player.accelerate(gravity);
    if (keyPressed) {
        player.move(keys);
    }

    // stroke(0)
    // line(0, 0, 0, height);
    // line(0, 0, width, 0);
    // line(width, 0, width, height);
    // line(0, height, width, height);
    
}

function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
}