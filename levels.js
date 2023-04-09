function f(x) {
    return -sq(x-1000-1000+50)/1000 + 200 + 1000;   
}

function loadLevel0 () {
    let level = new Level();
    
    // level.stroke(0, 0, 0);
    // level.line(1550, 500, 2000, 1000);

    level.noStroke();

    level.fill(50, 50, 50);
    level.rect(-50, 200, 800, 600);

    level.rect(1000, 300, 200, 50);
    level.rect(1400, 500, 200, 50);
    level.rect(1000, 700, 200, 1300);
    level.triangle(1199, 700, 2999, 2000, 1199, 2000);
    level.rect(1200, 1999, 3000, 50);
    // level.func(f, 1000-50, 5000, 10);

    return level;
}

function level0(player) {
    background(200);
    noStroke();    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("How did you get here?", 400, 0);
    text("You really shouldn't be here.................................................................", 1500, 2700)
}