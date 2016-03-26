var COLUMN_COUNT = 10;
var ROW_COUNT = 20;
var board = new Array(COLUMN_COUNT);
var current = new Array(COLUMN_COUNT);
var currentX;
var currentY;
var blockBox = [
	[1,1,1,0,1],
	[1,1,1,0,1],
	[0,1,1,0,1,1],
	[1,1,1,0,0,0,1],
	[1,1,0,0,1,1],
	[1,1,0,0,0,1,1],
	[1,1,1,1]
];


var colors = [
	'rgb(000,000,153)','rgb(000,204,255)','rgb(051,255,204)','rgb(000,204,102)','rgb(102,204,000)','rgb(000,102,000)','rgb(255,000,102)', 'rgb(204,000,255)', 'rgb(255,000,204)'
];

function generateBlock(){
	var blockNum = Math.floor(Math.random() * blockBox.length);
	var block = blockBox[blockNum];
	
	for(var y = 0; y < 4; ++y){
		
		for(var x = 0; x < 4; ++x){
			var i = 4 * y + x;
			if(typeof block[i] != 'undefined' && block[i]){
				current[y][x] = blockNum + 1;
			} else {
				current[y][x] = 0;
			}
		}
	}
	currentX = 5;
	currentY = 0;
}//generateBlock

function init(){
	for (var y = 0; y < ROW_COUNT; ++y) {
        board[y] = new Array(COLUMN_COUNT);
		current[y] = new Array(COLUMN_COUNT);
        for (var x = 0; x < COLUMN_COUNT; ++x) {
            board[y][x] = 0;
			current[y][x] = 0;
        }
    }
	
}//init

function tick(){
	if(valid(0,1)){
		++currentY;
	} else {
		freeze();
		clearLines();
		generateBlock();
	}
}//tick

function freeze(){
	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x ){
			if(current[y][x]){
				board[y + currentY][x + currentX] = current[y][x];
				}
		}
	}
}//freeze

function rotate(current){
	var newCurrent =  new Array(4);
	for(var y = 0; y < 4; ++y){
		newCurrent[y] = new Array(4);
		for(var x = 0; x < 4; ++x ){
			newCurrent[y][x] = current[3 - x][y];
		}
	}
	return newCurrent;
}//rotate

function clearLines(){
	for(var y = (ROW_COUNT - 1); y >= 0; --y){
		var row = true;
		for(var x = 0; x < COLUMN_COUNT; ++x){
			if(board[y][x] == 0){
				row = false;
				break;
			}
		}
		
		if(row){
			for(var newY = y; newY > 0; --newY){
				for(var x = 0; x < COLUMN_COUNT; ++x){
					board[newY][x] = board[newY - 1][x];
				}
			}
		++y	
		}
	}
}//clearLines

function onKeyPress(key){
	switch(key){
		case 'left':
			if(valid(-1)){
				--currentX;
			}
			break;
		case 'right':
			if(valid(1)){
				++currentX;
			}
			break;
		case 'up':
			var rotated = rotate(current);
			if(valid(0,0, rotated)){
				current = rotated;
			}
			break;
		case 'down':
			if(valid(0,1)){
				++currentY;
			}
			break;
	}
}//keyPress

function valid(offX, offY, newCurrent){
	offX = offX || 0; //evaluate first if 'offX' contains anything, type-safe to 0
	offY = offY || 0; //same here
	offX = currentX + offX;
	offY = currentY + offY;
	newCurrent = newCurrent || current; //also, here
	
	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x){
			if(newCurrent[y][x]){
				if(typeof board[y + offY] == 'undefined'){
					return false;
				} else if(typeof board[y + offY][x + offX] == 'undefined'){
					return false;
				} else if(board[y + offY][x + offX]){
					return false;				
				} else if(x + offX >= COLUMN_COUNT){
					return false;
				} else if(y + offY >= ROW_COUNT - 1){
					return false;
				} else if(x + offX < 0){
					return false;
				} else {
					return true;
				}
			}
		}
	}
	
	
}//valid

init();
generateBlock();
setInterval(tick, 250);