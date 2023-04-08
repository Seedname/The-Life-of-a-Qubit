var player;
function setup() {
    createCanvas(document.body.clientWidth, window.innerHeight);
    player = new Player(width/2, height/2, 20, [87, 83, 65, 68]);
}


var keys = [];

function draw() {
    background(0)
    player.update();
    player.display();
    if (keyPressed) {
        player.move(keys);
    }
}


function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
}