const n_stars = 500;
let stars = [];

class Vertex {
    constructor() {
        this.pos = createVector(width/3, height/3);
        this.dir = createVector(random(width)-width/2, random(height)-width/2).setMag(1);
    }

    update() {
        if (this.overflow()) this.dir.setMag(-this.dir.mag());
        this.pos.add(this.dir);
    }

    overflow() {
        return this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0;
    }
}

function setup() {
    createCanvas(800,800);
    stroke(255);
    for (let i = 0; i < n_stars; i++) stars.push(new Vertex());
}

function draw() {
    background(0);
    noFill();
    beginShape();
    for (let star of stars) {
        star.update();
        vertex(star.pos.x, star.pos.y);
    }
    endShape();
}
