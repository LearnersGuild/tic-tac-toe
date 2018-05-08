'use strict';

//todo - add enums to class
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


class Square {
	constructor(marker = STATES.EMPTY_STATE) {
		this.marker = marker;
	}
}

class Board {
	constructor(grid) {
		this.grid = [new Square(), new Square(), new Square(),new Square(), new Square(), new Square(),new Square(), new Square(), new Square()];
	}

	checkMove(i) {
		return this.grid[i].marker === STATES.EMPTY_STATE;
	}

	/**
	* check if the board is already full (so a tie)
	* uses es6 destructuring https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
	* @return {Boolean} [description]
	*/
//TODO: re-do with .some
	isFull() {
		for(var {marker:m} of this.grid){
			if(m === STATES.EMPTY_STATE){
				return false;
			}
		}
		return true ;
	}

	makeMove(i, marker) {
		if (this.checkMove(i)) {
			this.grid[i].marker = marker;
		}
	}

	/**
	* check rows, cols, diag to find a winner
	* @return {String} winning state
	*/
	findWinner() {
		const winStates = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < winStates.length; i++) {
			const [a, b, c] = winStates[i];
			if (this.grid[a].marker !== STATES.EMPTY_STATE &&
				this.grid[a].marker === this.grid[b].marker &&
				this.grid[a].marker === this.grid[c].marker) {
					return this.grid[a].marker;
				}
			}
			if (this.isFull()) {
				return GAMESTATE.TIE;
			}

			return GAMESTATE.PLAYING;
	}
}

	class Player {
		constructor(marker) {
			this.marker = marker;
		}
	}

	class Game {
		constructor(players) {
			this.board = new Board();
			this.players = [new Player(STATES.X_STATE), new Player(STATES.O_STATE)];
			this.gameState = GAMESTATE.PLAYING;
			this.currentPlayer = this.players[0];
		}

		setNextPlayer() {
			this.currentPlayer =  (this.currentPlayer.marker === STATES.X_STATE) ? this.players[1] : this.players[0];
		}

		makeMove(move) {
			this.board.makeMove(move, this.currentPlayer.marker);
		}

		play() {
			do {
				let move = this.getMoveInput();
				this.makeMove(move);
				this.setNextPlayer()
				this.gameState = this.board.findWinner();
				this.displayBoard();
			} while (this.gameState === GAMESTATE.PLAYING);
			this.displayGameStatus();
		}

		//View
		//TODO: Move to separate Object

		getMoveInput() {
			return prompt(`enter move for player ${this.currentPlayer.marker} using the square number: \n [0,1,2]\n[3,4,5]\n[6,7,8]`);
		}

		displayBoard() {
			//TODO: add newline for better display
			console.log(JSON.stringify(this.board.grid));
		}

		displayGameStatus() {
			if (this.gameState === GAMESTATE.TIE) {
				console.log('the game is a tie');
			} else {
				console.log(`the winner is ${this.gameState}`);
			}
		}
	}

	var g = new Game();
	g.play();
