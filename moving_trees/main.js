class Tree {
    constructor(x, y, len, angle1, angle2, dev, noise_off) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.noise_off = noise_off;

        if (random() < 0.5) angle1 += dev;
        else angle2 += dev;

        this.angle1 = angle1;
        this.angle2 = angle2 + dev;

    }

    draw() {
        // Apply noise to the angle
        this.noise_off += 0.01;
        let n = map(noise(this.noise_off), 0, 1, -PI / 8, PI / 8);
        this.angle1 += n;
        this.angle2 += n;

        // Draw tree branches
        stroke('rgb(102,138,102)');
        strokeWeight(2);
        push();
        translate(this.x, this.y);
        this.branch(this.len);
        pop();

        // Reset angle for next frame
        this.angle1 -= n;
        this.angle2 -= n;
    }

    branch(len) {
        line(0, 0, 0, -len);
        translate(0, -len);
        if (len > 4) {
            push();
            rotate(this.angle1);
            this.branch(len * 0.67);
            pop();
            push();
            rotate(this.angle2);
            this.branch(len * 0.67);
            pop();
        }
    }
}

let tree_slider, reset_button;
let trees = [];

function setup() {
    createCanvas(800, 600);
    tree_slider = createSlider(1, 10, 5);
    tree_slider.input(setupTrees);
    reset_button = createButton('Reset Trees');
    reset_button.mousePressed(setupTrees);
    setupTrees();
}

function draw() {
    background('lightblue');
    for (let tree of trees) {
        tree.draw();
    }
}

function setupTrees() {
    trees = generateTrees(tree_slider.value());
}

function generateTrees(n) {
    let trees = [];
    for (let i = 0; i < n; i++) {
        let x = width / (n + 1) * (i + 1);
        let y = height;
        let len = random(50, 100);
        // let angle = random(PI/16,PI/4);
        let angle = radians(floor(random(30, 60)));
        let deviation = random(-1, 1);
        let noise_offset = i * 1000;
        let tree = new Tree(x, y, len, angle, -angle, deviation, noise_offset);
        trees.push(tree);
    }
    return trees;
}
