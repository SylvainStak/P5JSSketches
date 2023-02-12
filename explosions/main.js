class Particle {
    constructor(x, y, fill) {
        this.fill = fill;
        this.pos = createVector(x, y);
        this.dir = createVector(random(width)-width/2, random(height)-height/2).setMag(1);
    }

    draw() {
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, 3);
    }

    update() {
        this.pos.add(this.dir);
        if (this.overflow()) this.dir.setMag(-this.dir.mag());
    }

    overflow() {
        return this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0;
    }
}

class Explosion {
    constructor(x, y) {
        this.particles = [];
        let fill = color(random(255),random(255),random(255));
        for (let i = 0; i < 1000; i++) this.particles.push(new Particle(x, y, fill));
    }

    update() {
        for (let particle of this.particles) {
            particle.update();
            particle.draw();
        }
    }
}

let explosions = [];

function setup() {
    createCanvas(800,800);
    noStroke();
}

function draw() {
    background(0);
    for (let exp of explosions) exp.update();
}

function mousePressed() {
    explosions.push(new Explosion(mouseX, mouseY));
    if (explosions.length > 3) explosions.shift();
}
