let trace_slider, lines_button, current_button, sources_button;
let curves_up = [];
let curves_left = [];
let traces = [];
let show_lines = true;
let show_current_point = true;
let show_sources = true;
const setupTraces = (len) => {for (let i = 0; i < len; i++) traces[i] = new Array()};

class Curve {
    constructor(pos, dia, mult, type=1) { // type 1 == curves_up // type 0 == curves_left
        this.source_pos = pos;
        this.dia = dia;
        this.mult = mult;
        this.type = type;
        this.angle = PI/2;
        this.update();
    }

    drawSource() {
        stroke(255);
        noFill();
        ellipse(this.source_pos.x, this.source_pos.y, this.dia);
        fill(255);
        ellipse(this.point_pos.x, this.point_pos.y, 7);
    }

    drawLine() {
        line(this.line_start.x, this.line_start.y, this.line_end.x, this.line_end.y);
    }

    update() {
        this.angle += 0.02*this.mult;
        this.point_pos = createVector(this.dia/2*cos(-this.angle), this.dia/2*sin(-this.angle));
        this.point_pos.add(this.source_pos);
        this.line_start = this.type ? createVector(this.point_pos.x, 0) : createVector(0, this.point_pos.y);
        this.line_end = this.type ? createVector(this.point_pos.x, height) : createVector(width, this.point_pos.y);
    }
}

function setup() {
    createCanvas(800, 800);
    let diameter = 80;
    let curve_speed = 1;

    for (let i = diameter*1.7; i < width; i+=diameter+7) {
        curves_up.push(new Curve(createVector(i, diameter*0.6), diameter, curve_speed));
        curve_speed++;
    }

    curve_speed = 1;

    for (let i = diameter*1.8; i < height; i+=diameter+7) {
        curves_left.push(new Curve(createVector(diameter*0.6, i), diameter, curve_speed, 0));
        curve_speed+=1;
    }

    let traces_len = curves_up.length*curves_left.length;
    traces = new Array(traces_len);
    setupTraces(traces_len);

    trace_slider = createSlider(3, 320, 320);
    trace_slider.input(() => setupTraces(traces_len));

    lines_button = createButton('Show/Hide Lines');
    lines_button.mousePressed(() => show_lines = !show_lines);

    current_button = createButton('Show/Hide Current Point');
    current_button.mousePressed(() => show_current_point = !show_current_point);

    sources_button = createButton('Show/Hide Sources');
    sources_button.mousePressed(() => show_sources = !show_sources);
}

function draw() {
    background(0);

    // Update curves
    for (let curve of curves_up.concat(curves_left)) {
        curve.update();
        if (show_sources) curve.drawSource();
        if (show_lines) curve.drawLine(); 
    }

    // Calc current trace vertex point for each curve
    for (let i = 0; i < curves_up.length; i++) {
        for (let j = 0; j < curves_left.length; j++) {
            let index = j*curves_up.length+i;
            let x = curves_up[i].point_pos.x;
            let y = curves_left[j].point_pos.y;

            if (show_current_point) ellipse(x, y, 7);
            traces[index].push(createVector(x, y));

            if (traces[index].length > trace_slider.value()) traces[index].shift();    
        }
    }

    // Draw line between all vertex of the curve
    for (let trace of traces) {
        strokeWeight(1);
        noFill();
        beginShape();
        for (let t of trace) vertex(t.x, t.y);
        endShape();
    }
}
