const N_PARTICLES = 1500;
let particles = new Array(N_PARTICLES);
let blobs = [];

class Particle {
    constructor(pos=null, color=255, size=5, noise_mult=0.01) {  
        if (pos) this.pos = pos;
        else this.setRandomPos();

        this.color = color;
        this.size = size;
        this.noise_mult = noise_mult;        
    }

    draw() {
        stroke(255);
        point(this.pos.x, this.pos.y);
    }

    setRandomPos() {
        this.pos = createVector(random(width), random(height));
    }

    checkOverflow() {
        if (this.overflow()) this.setRandomPos();
    }

    overflow() {
        return !(this.pos.x >= 0 && this.pos.x <= width && this.pos.y >= 0 && this.pos.y <= height);
    }

    update() {
        let noiseX = this.pos.x * this.noise_mult;
        let noiseY = this.pos.y * this.noise_mult;
        let noiseZ = pow(this.noise_mult,3);
        let a = TWO_PI*noise(noiseX, noiseY, noiseZ);

        this.pos.x += cos(a);
        this.pos.y += sin(a);

        this.checkOverflow();
    }
}

class Blob extends Particle {
    draw() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    checkOverflow() {}
}


function removeBlobOverflow() {
    let new_blobs = [];
    for (let i = 0; i < blobs.length; i++) {
        if (!blobs[i].overflow()) {
            new_blobs.push(blobs[i]);
        }
    }
    blobs = new_blobs;
}

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < N_PARTICLES; i++) particles[i] = new Particle();
}

function draw() {
    background(0);
    removeBlobOverflow();    

    for (let particle of particles.concat(blobs)) {
        particle.update();
        particle.draw();
    }
}

function mousePressed() {
    blobs.push(new Blob(createVector(mouseX, mouseY), 'blue', 15));
}
