class ClockHand {
    constructor(r, w) {
        this.r = r;
        this.w = w;
    }

    tick() {
        this.setAngle();
        let x = this.r*cos(this.angle)+width/2;
        let y = this.r*sin(this.angle)+height/2;
        strokeWeight(this.w);
        line(width/2, height/2, x, y);
    }
}

class Hours extends ClockHand{
    setAngle() { this.angle = radians(map(hour(), 0, 11, -90, 240)); }
}

class Minutes extends ClockHand{
    setAngle() { this.angle = radians(map(minute(), 0, 59, -90, 264)); }
}

class Seconds extends ClockHand{
    setAngle() { this.angle = radians(map(second(), 0, 59, -90, 264)); }
}

const CH = [
    new Hours(200, 5),
    new Minutes(290, 3),
    new Seconds(340, 1),
];

function setup() {
    createCanvas(800, 800);
    textAlign(CENTER, CENTER);
    textSize(40);
    stroke(0);
}

function draw() {
    background(255);

    ellipse(width/2, height/2, 6);
    CH.map(_ => _.tick()); 

    for (let i = 0; i < 60; i++) {
        let main_marker = !(i%5);
        let angle = radians(map(i, 0, 59, -90, 264));        
        let t_pos = createVector(320*cos(angle)+width/2, 320*sin(angle)+height/2);
        let m_start = createVector(350*cos(angle)+width/2, 350*sin(angle)+height/2);
        let m_end = createVector(380*cos(angle)+width/2, 380*sin(angle)+height/2);
        let m_text = i==0 ? 12 : i/5;
        strokeWeight(main_marker ? 3 : 1);
        line(m_start.x, m_start.y, m_end.x, m_end.y);
        if (main_marker) {
            strokeWeight(2);
            text(m_text, t_pos.x, t_pos.y);
        }
    }       
}
