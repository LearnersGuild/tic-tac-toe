
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square"
      onClick = {props.onClick} >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squareVals: Array(9).fill(null),
      nextPlayer: 'X',
    };
  }

  handleClick(i) {
    const squareValsNew = this.state.squareVals.slice();
    if (calculateWinner(squareValsNew) || squareValsNew[i]){
      return;
    }
    squareValsNew[i] = (this.state.nextPlayer === 'X') ? 'O' : 'X';
    this.setState({
      squareVals: squareValsNew,
      nextPlayer : (this.state.nextPlayer === 'X') ? 'O' : 'X',
    });
  }
  renderSquare(i) {
    return (
      <Square
        value = {this.state.squareVals[i]}
        onClick= {() =>  this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squareVals);
    let status;
    if (winner){
      status = "Winner: " + winner;
    } else {
      status = `Next player: ${(this.state.nextPlayer === 'X') ? 'O' : 'X'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
        <div className="game-board">
          <Board />
        </div>
    );
  }
}
//========================================
//Game Logic
function calculateWinner(squareVals) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squareVals[a] &&
      squareVals[a] === squareVals[b] &&
      squareVals[a] === squareVals[c]) {
      return squareVals[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
