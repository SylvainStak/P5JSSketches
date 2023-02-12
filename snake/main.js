const canvas = document.createElement('canvas');
canvas.style.border = '1px dotted black';
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const original_segments = [{x: 400, y: 300}, {x: 390, y: 300}, {x: 380, y: 300}, {x: 370, y: 300}];
var running = true;

const snake = {
    tail: [...original_segments],
    dir: {x: 10, y: 0},
    score: 0,
    apple: {},
    draw: function() {
        ctx.fillStyle = '#15eb4e';
        this.tail.forEach(segment => {            
            ctx.fillRect(segment.x, segment.y, 10, 10);
        });
    },
    move: function() {
        this.tail.pop();
        this.tail.unshift({
            x: this.tail[0].x + this.dir.x,
            y: this.tail[0].y + this.dir.y
        });
    },
    checkCollision: function() {
        for (let i = 1; i< this.tail.length; i++) {
            if (this.tail[0].x == this.tail[i].x &&
                this.tail[0].y == this.tail[i].y) {
                    restartGame();
                    return;
            }
        }
    },
    checkOverflow: function() {
        if (this.tail[0].x < 0) {
            this.tail[0].x = canvas.width - Math.abs(this.dir.x);
        }
        else if (this.tail[0].x + Math.abs(this.dir.x) > canvas.width) {
            this.tail[0].x = 0;
        }
        else if (this.tail[0].y < 0) {
            this.tail[0].y = canvas.height - Math.abs(this.dir.y);
        }
        else if (this.tail[0].y + Math.abs(this.dir.y) > canvas.height) {
            this.tail[0].y = 0;
        }
    },
    createApple: function() {
        x = Math.floor(Math.random()*790/10)*10;
        y = Math.floor(Math.random()*590/10)*10;
        this.apple = {x, y};
    },
    drawApple: function() {
        ctx.beginPath();
        ctx.fillStyle = '#ff0000';
        ctx.roundRect(this.apple.x, this.apple.y, 10, 10, [3]);
        ctx.fill();
        ctx.closePath();
    },
    checkApple: function() {
        if(this.tail[0].x == this.apple.x &&
           this.tail[0].y == this.apple.y) {
               this.createApple();
               this.addSegments();
               this.score++;
         }
    },
    addSegments: function() {
        for (let i = 0; i<4; i++) {
            x = snake.tail[snake.tail.length-1].x;
            y = snake.tail[snake.tail.length-1].y;
            snake.tail.push({x, y});
        }
    }
};

document.body.addEventListener('keydown', (event) => {
    if (running) {
        if      (!(snake.dir.y > 0) && (event.key == 'ArrowUp' || event.key == 'w'))    snake.dir = {x: 0, y: -10};
        else if (!(snake.dir.y < 0) && (event.key == 'ArrowDown' || event.key == 's'))  snake.dir = {x: 0, y: 10};
        else if (!(snake.dir.x > 0) && (event.key == 'ArrowLeft' || event.key == 'a'))  snake.dir = {x: -10, y: 0};
        else if (!(snake.dir.x < 0) && (event.key == 'ArrowRight' || event.key == 'd')) snake.dir = {x: 10, y: 0};
    } else {
        running = true;
        snake.score = 0;
    }    
});
 
function clearScreen() {
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function restartGame() {
    snake.tail = [...original_segments];
    snake.dir = {x: 10, y: 0};
    snake.createApple();
    running = false;
}

function drawScore() {
    ctx.fillStyle = '#1500ff';
    ctx.font = '25px Arial';
    ctx.fillText(`Score: ${snake.score}`,10,30);
}

function drawGameOver() {
    ctx.fillStyle = '#1500ff';
    ctx.font = '50px Arial';
    ctx.fillText('GAME OVER!',250,200);
    ctx.fillText(`Score: ${snake.score}`,250,300);
    ctx.fillStyle = '#000';
    ctx.font = '25px Arial';
    ctx.fillText('Press any key to play again',250,400);
}

function gameLoop() {
    if (running) {
        clearScreen();
        snake.drawApple();
        snake.draw();
        snake.move();
        snake.checkCollision();
        snake.checkOverflow();
        snake.checkApple();
        drawScore();
    } else {
        clearScreen();
        drawGameOver();
    }
}

snake.createApple();
setInterval(gameLoop, 50);
