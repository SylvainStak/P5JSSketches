let points = [];
let button;
let len = 20;

function setup() {
    createCanvas(800,800);

    button = createButton('Switch mode');
    button.mousePressed(() => len = -len);

    for (let i = len; i < width; i += len) {
        for (let j = len; j < height; j += len) {
            points.push(createVector(i,j));
        }
    }    
}

function draw() {
    background(0);
    stroke(255);

    for (let p of points) {
        let dir = createVector(mouseX-p.x, mouseY-p.y);
        dir.setMag(len);
        line(p.x, p.y, p.x+dir.x, p.y+dir.y);
    }
}
