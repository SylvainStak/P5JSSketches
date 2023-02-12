let vertex_list, current_p, sides;

function getVertexList(size) {
    let vList = new Array(size);
    for (let i = 0; i < size; i++) {
        let angle = radians(map(i, 0, size, -90, 270));
        vList[i] = createVector(width/2*cos(angle)+width/2, height/2*sin(angle)+height/2);
    }
    return vList;
}

function setup() {
    createCanvas(800, 800);
    background(0);
    strokeWeight(1);
    stroke(255);    
    noFill();
    vertex_list = getVertexList(3);
    current_p = createVector(random(width), random(height)); 
    sides = createSlider(3, 6, 3);
    sides.input(() => {
        background(0);
        vertex_list = getVertexList(sides.value());       
    });      
}

function draw() {
    for (let i = 0; i < 100; i++) {
        let r = floor(random(sides.value()));
        let x = lerp(current_p.x, vertex_list[r].x, 0.5);
        let y = lerp(current_p.y, vertex_list[r].y, 0.5);
        current_p = createVector(x, y);
        point(current_p.x, current_p.y);
    }

    beginShape();
    for (let v of vertex_list) vertex(v.x, v.y);
    endShape(CLOSE);
}
