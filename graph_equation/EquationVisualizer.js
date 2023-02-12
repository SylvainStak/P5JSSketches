class EquationVisualizer {
    constructor(func, x_low=-10, x_high=10, y_low=-10, y_high=10, step=0.1, show_line=true, show_points=false) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.setup(func, x_low, x_high, y_low, y_high, step, show_line, show_points);
    }

    setup(
        func=this.func,
        x_low=this.x_range.l1,
        x_high=this.x_range.l2,
        y_low=this.y_range.l1,
        y_high=this.y_range.l2,
        step=this.step,
        show_line=this.show_line,
        show_points=this.show_points,
    ) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,500,500);
        this.x_range = {l1: x_low, l2: x_high};
        this.y_range = {l1: y_low, l2: y_high};
        this.step = step;
        this.func = func;
        this.show_line = show_line;
        this.show_points = show_points;
        this.x_points = this.generateXAxis();
        this.y_points = this.generateYAxis(this.x_points);
        this.drawGrid();
        if (show_line) this.drawGraphLine();
        if (show_points) this.drawGraphPoints();
    }

    generateXAxis() {
        let points = [];
        for (let i = this.x_range.l1; i <= this.x_range.l2; i+=this.step) {
            points.push(i)
        }
        return points;
    }

    generateYAxis(x_points) {
        let points = [];
        for (let i = 0; i < x_points.length; i++) {
            points.push(this.func(x_points[i]));
        }
        return points;
    }

    map(n, x1, y1, x2, y2) {
        return ((n-x1)/(y1-x1))*(y2-x2)+x2;
    }

    point(x, y, color='lightgreen', size=1){
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,size,size);
        this.ctx.closePath();
    }

    line(x1, y1, x2, y2, color='white') {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawGrid() {
        this.line(0, 250, 500, 250);
        this.line(250, 0, 250, 500);

        let x_half_low = this.x_range.l1 + ((this.x_range.l2 - this.x_range.l1)*0.25);
        let x_half_high = this.x_range.l1 + ((this.x_range.l2 - this.x_range.l1)*0.75);

        let y_half_low = this.y_range.l1 + ((this.y_range.l2 - this.y_range.l1)*0.25);
        let y_half_high = this.y_range.l1 + ((this.y_range.l2 - this.y_range.l1)*0.75);


        let x_half_low_X = this.map(x_half_low, this.x_range.l1, this.x_range.l2, 0, 500);
        let x_half_low_Y = this.map(0, this.y_range.l1, this.y_range.l2, 0, 500);

        let x_half_high_X = this.map(x_half_high, this.x_range.l1, this.x_range.l2, 0, 500);
        let x_half_high_Y = this.map(0, this.y_range.l1, this.y_range.l2, 0, 500);

        let y_half_low_X = this.map(0, this.x_range.l1, this.x_range.l2, 0, 500);
        let y_half_low_Y = this.map(y_half_low, this.y_range.l1, this.y_range.l2, 500, 0);

        let y_half_high_X = this.map(0, this.x_range.l1, this.x_range.l2, 0, 500);
        let y_half_high_Y = this.map(y_half_high, this.y_range.l1, this.y_range.l2, 500, 0);

        this.line(x_half_low_X, 245, x_half_low_X, 255);
        this.line(x_half_high_X, 245, x_half_high_X, 255);
        this.line(245, y_half_low_Y, 255, y_half_low_Y);
        this.line(245, y_half_high_Y, 255, y_half_high_Y);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(+x_half_low.toFixed(4),x_half_low_X,x_half_low_Y+15);
        this.ctx.fillText(+x_half_high.toFixed(4),x_half_high_X,x_half_high_Y+15);
        this.ctx.textAlign = 'right';
        this.ctx.fillText(+y_half_low.toFixed(4),y_half_low_X-7,y_half_low_Y+4);
        this.ctx.fillText(+y_half_high.toFixed(4),y_half_high_X-7,y_half_high_Y+4);
    }

    generateGraphPoints() {
        let func_coords = [];
        for (let i = 0; i < this.x_points.length; i++) {
            const x_point = this.map(this.x_points[i], this.x_range.l1, this.x_range.l2, 0, this.canvas.width);
            const y_point = this.map(this.y_points[i], this.y_range.l1, this.y_range.l2, this.canvas.height, 0);
            func_coords.push({x_point, y_point});            
        }
        return func_coords;
    }

    drawGraphLine() {
        const coords = this.generateGraphPoints();
        for (let i = 0; i < this.x_points.length-1; i++) {
            const current_coords = coords[i];
            const next_coords = coords[i+1];
            this.line(current_coords.x_point, current_coords.y_point, next_coords.x_point, next_coords.y_point, 'red');
        }
    }

    drawGraphPoints() {
        let points = this.generateGraphPoints();
        for (let i = 0; i < points.length-1; i++) {
            this.point(points[i].x_point, points[i].y_point);
        }
    }
}
