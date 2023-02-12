const radius_multiplier = 0.5;
const angle_multiplier = 0.1;
let last_point, radius, angle;

function setup() {
    createCanvas(800,800);
    background(0);
    stroke(255);
    radius = 0;
    angle = 0;
    last_point = createVector(width/2, height/2);
}

function draw() {
    let x = radius*cos(angle)+width/2;
    let y = radius*sin(angle)+height/2;
    line(last_point.x, last_point.y, x, y);
    last_point = createVector(x, y);
    radius+=radius_multiplier;
    angle+=angle_multiplier;
}
