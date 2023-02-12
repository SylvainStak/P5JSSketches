let sides;

function setup() {
    createCanvas(800, 800);
    stroke(255);
    sides = createSlider(3, 20, 3);
}

function draw() {
    background(0);
    beginShape();
    for (let i = 0; i < sides.value(); i++) {
        let angle = radians(map(i, 0, sides.value(), -90, 270));
        let x = width/2*cos(angle)+width/2;
        let y = height/2*sin(angle)+height/2
        vertex(x, y);
    }
    endShape(CLOSE);
}
