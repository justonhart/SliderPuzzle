const DIRECTIONS = ["up","down","left","right"];
let columnCount = 3;
let rowCount = 3;

drawBoard();

addEventListener("keydown", (event) => {
	//down
	if(event.key === 'ArrowDown' || event.key == 's' || event.key == 'j'){
		move("down");
	}
	//up
	if(event.key === 'ArrowUp' || event.key == 'w' || event.key == 'k'){
		move("up");
	}
	//left
	if(event.key === 'ArrowLeft' || event.key == 'a' || event.key == 'h'){
		move("left");
	}
	//right
	if(event.key === 'ArrowRight' || event.key == 'd' || event.key == 'l'){
		move("right");
	}
});

addEventListener("click", (event) => {
	switch(event.target.id){
		case 'decreaseHeight':
			rowCount -= 1;
			drawBoard();
			break;
		case 'increaseHeight':
			rowCount += 1;
			drawBoard();
			break;
		case 'decreaseWidth':
			columnCount -= 1;
			drawBoard();
			break;
		case 'increaseWidth':
			columnCount += 1;
			drawBoard();
			break;
		case 'shuffle':
			shuffle(1000);
			break;
	}
});

function move(direction) {
	const container = document.getElementById('container');
	const spaces = Array.from(container.children);
	const emptyIndex = spaces .findIndex(c => c.classList.contains('empty'));
	const emptySpaceColumn = emptyIndex % columnCount;
	const emptySpaceRow = Math.floor(emptyIndex / columnCount);
	let indexToMove;

	switch(direction){
		case "up":
			//get value from same column, row + 1; add column count from index
			if(rowCount > emptySpaceRow + 1){
				indexToMove = emptyIndex + columnCount;
			}
			break;
		case "down":
			//get value from same column, row - 1; subtract column count from index
			if(emptySpaceRow > 0){
				indexToMove = emptyIndex - columnCount;
			}
			break;
		case "left":
			//get value from same row, column + 1; index + 1
			if(columnCount > emptySpaceColumn + 1){
				indexToMove = emptyIndex + 1;
			}
			break;
		case "right":
			//get value from same row, column - 1; index - 1
			if(emptySpaceColumn > 0){
				indexToMove = emptyIndex - 1;
			}
			break;
	}

	if(indexToMove != undefined){
		spaces[emptyIndex].textContent = spaces[indexToMove].textContent;
		spaces[emptyIndex].classList.remove('empty');
		spaces[indexToMove].textContent = '';
		spaces[indexToMove].classList.add('empty');
		return true;
	}
	return false;
}

function drawBoard(){
	const container = document.getElementById('container');
	container.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
	container.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
	container.innerHTML = '';

	for(let i = 1; i < rowCount * columnCount; i++){
		let div = document.createElement('div');
		div.textContent = i;
		div.classList.add('space');
		document.getElementById('container').appendChild(div);
	}

	let empty = document.createElement('div');
	empty.classList.add('space');
	empty.classList.add('empty');
	document.getElementById('container').appendChild(empty);
}

function shuffle(totalMoves){
	let successfulMoves = 0;
	while(successfulMoves < totalMoves){
		const direction = DIRECTIONS[Math.floor(Math.random() * 4)];
		let success = move(direction);
		if(success){
			successfulMoves++;
		}
	}
}
