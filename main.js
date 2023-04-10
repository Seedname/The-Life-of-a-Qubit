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
    if (keyIsPressed) {
        player.move(keys);
    } else if (mouseIsPressed) {
        if (mouseX < width/2) {
            keys[player.controls[2]] = true;
            player.move(keys);
        } else {
            keys[player.controls[2]] = false;
        }
        if (mouseX >= width/2 && dist(mouseX, mouseY, width-150, height-100) > 40)  {
            keys[player.controls[3]] = true;
            player.move(keys);
        } else {
            keys[player.controls[3]] = false;
        }
        if (dist(mouseX, mouseY, width-150, height-100) <= 40){
            keys[player.controls[0]] = true;
            player.move(keys);
        } else {
            keys[player.controls[0]] = false;
            player.release(keys);
        }
    } else {
        keys[player.controls[2]] = false;
        keys[player.controls[3]] = false;
        keys[player.controls[0]] = false;
        player.release(keys);
    }

    levels[level].display();
    pop();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        noStroke();
        fill(255);
        if (dist(mouseX, mouseY, width-150, height-100) <= 40) {
            fill(200);
        }
        textSize(25);
        ellipse(width-150, height-100, 80, 80);
        fill(0);
        textAlign(CENTER, CENTER);
        text("JUMP", width-150, height-100);
    }
    
}

function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
    player.release(keys);
}