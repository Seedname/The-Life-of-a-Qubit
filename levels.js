function f(x) {
    return -sq(x-1000-1000+50)/1000 + 200 + 1000;   
}

function x(t) {
    // return 100*(t - sin(t));
    return 100 * cos(t);
}

function y(t) {
    // return 200*(1 - cos(t));
    return 100 * sin(t);
}

function loadLevel0 () {
    let level = new Level();
    
    // level.stroke(0, 0, 0);
    // level.line(1550, 500, 2000, 1000);

    level.noStroke();

    // level.fill(50, 50, 50);
    level.fill(100, 100, 100);
    level.rect(-50, 200, 800, 600);

    level.rect(1000, 300, 200, 50);
    level.rect(1400, 500, 200, 50);
    level.rect(1000, 700, 200, 1300);
    level.triangle(1199, 700, 2999, 2000, 1199, 2000);
    level.rect(1200, 1999, 3000, 50);

    level.noFill();
    level.stroke(0, 0, 0);

    level.fill(0, 0, 0);
    level.spike(775, 800, 50);
    level.spike(775+40, 800, 50);
    level.spike(775+80, 800, 50);
    level.spike(775+120, 800, 50);
    level.spike(775+160, 800, 50);
    level.spike(775+200, 800, 50);
    // level.para(y, x, 0, 2*PI, 0.1, 100, 0);
    // level.func(f, 1000-50, 5000, 10);

    return level;
}

function level0(player) {
    background(50, 50, 50);
    noStroke();    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("How did you get here?", 400, 0);
    text("You really shouldn't be here", 3800, 1800)
}