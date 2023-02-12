let walls = [];
let n_walls = 8;
let n_rays;

class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        stroke('lightgreen');
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

class Ray {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        stroke('rgba(255, 255, 255, 0.5)');
        line(this.x1, this.y1, this.x2, this.y2);
    }

    cast(walls) {
        for (let wall of walls) {

            let x1 = this.x1;
            let y1 = this.y1;
            let x2 = this.x2;
            let y2 = this.y2;
            let x3 = wall.x1;
            let y3 = wall.y1;
            let x4 = wall.x2;
            let y4 = wall.y2;

            // https://en.wikipedia.org/wiki/Line-line_intersection
            let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
            let u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denom;

            // According to the wikipedia article,
            // there is an intersection if values 
            // of (t) and (u) are between 0 and 1
            if (0 < t && t < 1 && 0 < u && u < 1) {
                let newX = x3 + u * (x4 - x3);
                let newY = y3 + u * (y4 - y3);

                // If intersection is closer than previous one, use it as ray end coords.
                // By the end of the loop, the ray will have its end-position coords as
                // the closest wall collision found
                if (this.getDistance(newX, newY) < this.getDistance(this.x2, this.y2)) {
                    this.x2 = newX;
                    this.y2 = newY;
                }
            }
        }        
    }

    // Calc distance between ray origin and given coords
    getDistance(x,y) {
        return Math.abs(this.x1-x)+Math.abs(this.y1-y);
    }
}

function setup() {
    createCanvas(800, 600);

    const w_limits = [
        [0,0,width,0],
        [0,0,0,height],
        [0,height,width,height],
        [width,0,width,height],
    ];

    // Create random walls
    for (let i = 0; i < n_walls; i++) {
        walls.push(new Wall(
            Math.floor(Math.random() * (width + 1)),
            Math.floor(Math.random() * (height + 1)),
            Math.floor(Math.random() * (width + 1)),
            Math.floor(Math.random() * (height + 1)),
        ));
    }

    for (let w of w_limits) {
        walls.push(new Wall(w[0], w[1], w[2], w[3]));
    }

    n_rays = createSlider(30, 360, 300, 1);
    n_rays.position(10,23)
}

let xoff = 0;
let yoff = 0;
let x, y;

function draw() {
    background(0);
    textSize(20);
    text('n_rays', 10, 15);
    fill(255);

    // Draw walls
    for(let wall of walls) {
        wall.draw();
    }

    // Light source on mouse position if mouse on canvas, otherwise use perlin noise
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        x = mouseX;
        y = mouseY;
    } else {
        x = map(noise(xoff),0,1,0,width);
        y = map(noise(yoff),0,1,0,height);
    }   

    xoff += 0.01;
    yoff += 0.005;

    // Cast rays
    for (let i = 0; i < n_rays.value(); i++) {
        let degrees = map(i, 0, n_rays.value(), 0, 360);
        let v = p5.Vector.fromAngle(radians(degrees), Math.hypot(width, height));        
        ray = new Ray(x, y, x+v.x, y+v.y);
        ray.cast(walls);
        ray.draw();
    }
}
