var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

var WIDTH = 300;
var HEIGHT = 600;
var COLUMN_COUNT = 10;
var ROW_COUNT = 20;
var BLOCK_WIDTH = WIDTH / COLUMN_COUNT;
var BLOCK_HEIGHT = HEIGHT / ROW_COUNT;

function drawBlock(x, y) {
    ctx.fillRect((BLOCK_WIDTH * x), (BLOCK_HEIGHT * y), (BLOCK_WIDTH - 1), (BLOCK_HEIGHT - 1));
    ctx.strokeRect((BLOCK_WIDTH * x), (BLOCK_HEIGHT * y), (BLOCK_WIDTH - 1), (BLOCK_HEIGHT - 1));
}

function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = 'black';
    for (var x = 0; x < COLUMN_COUNT; ++x) {
        for (var y = 0; y < ROW_COUNT; ++y) {
            if(board[y][x]){
                ctx.fillStyle = colors[board[y][x] - 1];
                drawBlock(x, y);
            }
        }
    }

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (current[y][x]) {
                ctx.fillStyle = colors[current[y][x] - 1];
                drawBlock(currentX + x, currentY + y);
            }
        }
    }
}

setInterval(render, 30);