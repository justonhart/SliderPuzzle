let columnCount = 4;
let rowCount = 3;

drawBoard();

addEventListener("keydown", (event) => {
	const container = document.getElementById('container');
	const spaces = Array.from(container.children);
	const emptyIndex = spaces .findIndex(c => c.classList.contains('empty'));
	const emptySpaceColumn = emptyIndex % columnCount;
	const emptySpaceRow = Math.floor(emptyIndex / columnCount);

	let indexToMove;

	//down
	if(event.key === 'ArrowDown' || event.key == 's' || event.key == 'j'){
		//get value from same column, row - 1; subtract column count from index
		if(emptySpaceRow > 0){
			indexToMove = emptyIndex - columnCount;
		}
	}
	//up
	if(event.key === 'ArrowUp' || event.key == 'w' || event.key == 'k'){
		//get value from same column, row + 1; add column count from index
		if(rowCount > emptySpaceRow + 1){
			indexToMove = emptyIndex + columnCount;
		}
	}
	//left
	if(event.key === 'ArrowLeft' || event.key == 'a' || event.key == 'h'){
		//get value from same row, column + 1; index + 1
		if(columnCount > emptySpaceColumn + 1){
			indexToMove = emptyIndex + 1;
		}
	}
	//right
	if(event.key === 'ArrowRight' || event.key == 'd' || event.key == 'l'){
		//get value from same row, column - 1; index - 1
		if(emptySpaceColumn > 0){
			indexToMove = emptyIndex - 1;
		}
	}

	if(indexToMove != undefined){
		spaces[emptyIndex].textContent = spaces[indexToMove].textContent;
		spaces[emptyIndex].classList.remove('empty');
		spaces[indexToMove].textContent = '';
		spaces[indexToMove].classList.add('empty');
	}
});

function drawBoard(){
	document.getElementById('container').style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
	document.getElementById('container').style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;

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
