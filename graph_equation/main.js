// Visualize sin(x)
const eq = (x) => Math.sin(x);
const graph = new EquationVisualizer(eq);


// User Interface
let labelX = document.createElement('label');
labelX.innerHTML = 'X-LIMIT';
let sliderX = document.createElement('input');
sliderX.type = 'range';
sliderX.min=1;
sliderX.max=100;
sliderX.value=10;
sliderX.step=1;

let labelY = document.createElement('label');
labelY.innerHTML = 'Y-LIMIT';
let sliderY = document.createElement('input');
sliderY.type = 'range';
sliderY.min=1;
sliderY.max=100;
sliderY.value=10;
sliderY.step=1;

let inputX = document.createElement('input');
inputX.type = 'number';
inputX.value = 10;
inputX.style.width = '5rem';
inputX.min = 1;
inputX.max = 100;

let inputY = document.createElement('input');
inputY.type = 'number';
inputY.value = 10;
inputY.style.width = '5rem';
inputY.min = 1;
inputY.max = 100;

let labelLine = document.createElement('label');
labelLine.innerHTML = 'Show Lines';
labelLine.htmlFor = 'checkbox-line';
let checkboxLine = document.createElement('input');
checkboxLine.type = 'checkbox';
checkboxLine.id = 'checkbox-line';
checkboxLine.checked = 'true';

let labelPoints = document.createElement('label');
labelPoints.innerHTML = 'Show Points';
labelPoints.htmlFor = 'checkbox-points';
let checkboxPoints = document.createElement('input');
checkboxPoints.type = 'checkbox';
checkboxPoints.id = 'checkbox-points';


checkboxLine.onchange = function() {
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value, 0.1, checkboxLine.checked, checkboxPoints.checked);
}

checkboxPoints.onchange = function() {
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value, 0.1, checkboxLine.checked, checkboxPoints.checked);
}

sliderX.oninput = function() {
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value, 0.1, checkboxLine.checked, checkboxPoints.checked);
    inputX.value = this.value;
}

sliderY.oninput = function() {
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value, 0.1, checkboxLine.checked, checkboxPoints.checked);
    inputY.value = this.value;
}

inputX.oninput = function() {
    sliderX.value = parseFloat(this.value);
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value, 0.1, checkboxLine.checked, checkboxPoints.checked);
}

inputY.oninput = function() {
    sliderY.value = parseFloat(this.value);
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value, 0.1, checkboxLine.checked, checkboxPoints.checked);
}

canv = document.getElementsByTagName('canvas')[0];
canv.addEventListener('wheel', (e) => {
    if(e.deltaY < 0) {
        if (sliderX.value > 1) sliderX.value--; 
        if (sliderY.value > 1) sliderY.value--;
        if (inputX.value > 1)  inputX.value--;
        if (inputY.value > 1)  inputY.value--;
    } else {
        if (sliderX.value < 100) sliderX.value++;  
        if (sliderY.value < 100) sliderY.value++;
        if (inputX.value < 100)  inputX.value++;
        if (inputY.value < 100)  inputY.value++;
    }
    graph.setup(func=eq, x_low=-sliderX.value, x_high=sliderX.value, y_low=-sliderY.value, y_high=sliderY.value);
});

document.body.appendChild(document.createElement('br'));
document.body.appendChild(labelX);
document.body.appendChild(sliderX);
document.body.appendChild(inputX);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(labelY);
document.body.appendChild(sliderY);
document.body.appendChild(inputY);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(labelLine);
document.body.appendChild(checkboxLine);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(labelPoints);
document.body.appendChild(checkboxPoints);
