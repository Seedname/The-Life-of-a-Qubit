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
    push();
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
    if (keyPressed || mouseIsPressed) {
        player.move(keys);
    }

    levels[level].display();
    pop();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        noStroke();
        ellipse(width-150, height-100, 50, 50);
        stroke(0);
        textAlign(CENTER, CENTER);
        text("JUMP", width-150, height-100);
    }
    
}

function mousePressed() {
    if (mouseX < width/2) {
        keys[player.controls[2]] = true;
    } else if (dist(mouseX, mouseY, width-100, height-100) > 50)  {
        keys[player.controls[3]] = true;
    } else {
        keys[player.controls[0]] = true;
    }
}

function mouseReleased() {
    if (mouseX < width/2) {
        keys[player.controls[2]] = false;
    } else if (dist(mouseX, mouseY, width-100, height-100) > 50)  {
        keys[player.controls[3]] = false;
    } else {
        keys[player.controls[0]] = false;
        player.release(keys);
    }
}

function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
    player.release(keys);
}