'use strict';

function checkMove(move, grid){
	return grid[move] === STATES.EMPTY_STATE;
}

function isFull(grid) {
	return !grid.includes(STATES.EMPTY_STATE);
}

function makeMove(move, currentPlayer, grid) {
	let newGrid = grid.slice();
	if (checkMove(move, newGrid)) {
		newGrid[move] = currentPlayer;
	}
	return newGrid;
}

function findWinner(grid) {
	if (isFull(grid)) {
		return GAMESTATE.TIE;
	}
	const winStates = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < winStates.length; i++) {
		const [a, b, c] = winStates[i];
		if (grid[a] !== STATES.EMPTY_STATE &&
			grid[a] === grid[b] &&
			grid[a] === grid[c]) {
				return grid[a];
			}
		}
		return GAMESTATE.PLAYING;
	}

	function setNextPlayer(currentPlayer) {
		return (currentPlayer === STATES.X_STATE) ? STATES.O_STATE : STATES.X_STATE;
	}

	function getMoveInput(currentPlayer) {
		//TODO: allow cancel, keep running until good input
		return prompt(`enter move for player ${currentPlayer} using the square number: \n[0,1,2]\n[3,4,5]\n[6,7,8]`);
	}


	function initGrid(){
		return new Array(9).fill(STATES.EMPTY_STATE);
	}

	function play(move, currentPlayer = STATES.X_STATE, grid = initGrid()){
		grid = makeMove(move, currentPlayer, grid);
		displayBoard(grid);
		let gameState = findWinner(grid);
		if (gameState!== GAMESTATE.PLAYING){
			return gameState;
		}
		else{
			currentPlayer = setNextPlayer(currentPlayer);
			return play(getMoveInput(currentPlayer), currentPlayer, grid);
		}
	}

	const STATES = {
		EMPTY_STATE: '~',
		X_STATE: 'X',
		O_STATE: 'O'
	};

	const GAMESTATE = {
		PLAYING : 0,
		TIE : 1,
		WIN : 2
	}

	function displayBoard(grid) {
		console.log(JSON.stringify(grid));
	}

	function displayGameStatus(gameState) {
		let elem = document.getElementById('winner');
		if (gameState === GAMESTATE.TIE) {
			elem.innerHTML = 'The game is a tie';
		} else {
			elem.innerHTML = `The winner is ${gameState}`;
		}
	}

displayGameStatus(play(getMoveInput(STATES.X_STATE)));
