var player, camera, levels, scenes, level, balls;

function preload() {
    // balls = [];
    // for (let i = 0; i < 10; i++) {
    //     balls.push(new Player(100, 100, 20, []));
    // }
}

function setup() {
    createCanvas(document.body.clientWidth, window.innerHeight);
    player = new Player(100, 0, 20, [32, 83, 65, 68]);
    camera = new Camera(100, 0);
    levels = [loadLevel0()];
    scenes = [level0];
    level = 0;
}

var keys = [];

function draw() {
    camera.moveTo(player.pos);
    camera.update();
    camera.apply();
    
    scenes[level]();

    player.update();
    player.constrain();
    levels[level].collide(player);
    player.display();

    let gravity = createVector(0, 0.2);
    player.accelerate(gravity);
    if (keyPressed) {
        player.move(keys);
    }

    levels[level].display();
    
}

function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
    player.release(keys);
}