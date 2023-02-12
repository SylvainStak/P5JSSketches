class Satellite {
    constructor(d, s, c) {
        this.pos = createVector(d*cos(PI)+width/2, d*sin(PI)+height/2);
        this.angle = PI;
        this.d = d; // distance
        this.s = s; // speed
        this.c = c; // color                
    }

    draw() {
        noStroke(); 
        fill(this.c);             
        ellipse(this.pos.x, this.pos.y, 15);
    }

    drawOrbit() {
        noFill();
        stroke(this.c);
        strokeWeight(0.8);        
        ellipse(width/2, height/2, this.d*2);
    }

    updateOrbit() {
        this.angle += this.s;
        let x = this.d*cos(this.angle)+width/2;
        let y = this.d*sin(this.angle)+height/2;
        this.pos = createVector(x, y);
    }
}

let satellites = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB);
    angle = PI;
    for (let i = 1; i <= 20; i++) {
        let c = color(map(i, 1, 20, 0, 360), 100, 100);
        satellites.push(new Satellite(i*19, i/1000, c));
    }
}

function draw() {
    background(0);
    for (let satellite of satellites) {
        satellite.draw();
        satellite.drawOrbit();
        satellite.updateOrbit();
    }
}
