/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import './App.css';

import Header from './Components/Header/Header';
import GameBoard from './Components/GameBoard/GameBoard';
import { CELL_STATE } from './Components/Cell/Cell';

const INITIAL_SIZE = Object.freeze({
  X: 5,
  Y: 5,
});

const NEIGHBOR_RULES = Object.freeze({
  0: CELL_STATE.DEAD,
  1: CELL_STATE.DEAD,
  2: CELL_STATE.ALIVE,
  3: CELL_STATE.ALIVE,
  4: CELL_STATE.DEAD,
  5: CELL_STATE.DEAD,
  6: CELL_STATE.DEAD,
  7: CELL_STATE.DEAD,
  8: CELL_STATE.DEAD,
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: [],
      keyId: 0,
    };

    const { state } = this;

    for (let i = 0; i < INITIAL_SIZE.X; i += 1) {
      state.board.push([]);

      for (let j = 0; j < INITIAL_SIZE.Y; j += 1) {
        state.board[i].push({ state: CELL_STATE.ALIVE, id: state.keyId += 1 });
      }
    }

    this.increaseRows = this.increaseRows.bind(this);
    this.decreaseRows = this.decreaseRows.bind(this);
    this.increaseCols = this.increaseCols.bind(this);
    this.decreaseCols = this.decreaseCols.bind(this);
    this.nextKey = this.nextKey.bind(this);
    this.flipCell = this.flipCell.bind(this);
    this.flipCells = this.flipCells.bind(this);
    this.calcNextGeneration = this.calcNextGeneration.bind(this);
    this.debug = this.debug.bind(this);
  }

  increaseRows() {
    const { board } = this.state;
    let { keyId } = this.state;
    const width = board[0].length;

    /* even values add on top, odd values add on bottom */
    if (!(board.length % 2)) {
      board.push([]);
      for (let i = 0; i < width; i += 1) {
        board[board.length - 1].push({ state: CELL_STATE.DEAD, id: keyId += 1 });
      }
    } else {
      board.unshift([]);
      for (let i = 0; i < width; i += 1) {
        board[0].push({ state: CELL_STATE.DEAD, id: keyId += 1 });
      }
    }

    this.setState({ board, keyId });
  }

  decreaseRows() {
    const { board } = this.state;

    if (board.length <= 2) {
      console.info("Can't decrease the row count more");
      return;
    }

    if (!(board.length % 2)) {
      board.shift();
    } else {
      board.pop();
    }

    this.setState({ board });
  }

  increaseCols() {
    const { board } = this.state;
    let { keyId } = this.state;

    if (!(board[0].length % 2)) {
      for (let j = 0; j < board.length; j += 1) {
        board[j].unshift({ state: CELL_STATE.DEAD, id: keyId += 1 });
      }
    } else {
      for (let j = 0; j < board.length; j += 1) {
        board[j].push({ state: CELL_STATE.DEAD, id: keyId += 1 });
      }
    }

    this.setState({ board, keyId });
  }

  decreaseCols() {
    const { board } = this.state;

    if (board[0].length <= 2) {
      console.info("Can't decrease the column count more");
      return;
    }

    if (!(board[0].length % 2)) {
      for (let j = 0; j < board.length; j += 1) {
        board[j].pop();
      }
    } else {
      for (let j = 0; j < board.length; j += 1) {
        board[j].shift();
      }
    }

    this.setState({ board });
  }

  nextKey() {
    const { state } = this;
    const key = state.keyId;

    this.setState((prevState) => ({ keyId: prevState.keyId + 1 }));
    return key;
  }

  flipCells() {
    const { board } = this.state;

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        board[i][j].state = !board[i][j].state;
      }
    }
    this.setState({ board });
  }

  flipCell(id) {
    const { board } = this.state;

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (board[i][j].id === id) {
          board[i][j].state = !board[i][j].state;
          this.setState({ board });
        }
      }
    }
  }

  calcNextGeneration() {
    const { board } = this.state;
    const newBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[0].length; j += 1) {
        const nCount = this.countNeighbors(i, j, board);
        newBoard[i][j].state = NEIGHBOR_RULES[nCount];
      }
    }

    this.setState({ board: newBoard });
  }


  countNeighbors(i, j, board) {
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1], [0, 1], [0, -1], [1, 0], [-1, 0]];

    // eslint-disable-next-line max-len
    const countNeighborsReducer = (acc, [x, y]) => (board[x][y].state === CELL_STATE.ALIVE ? acc + 1 : acc);

    return directions.map((dir) => {
      let x = 0;
      let y = 0;


      if (i + dir[0] < 0) x = board[0].length - 1;
      else if (i + dir[0] >= board[0].length) x = 0;
      else x = i + dir[0];

      if (j + dir[1] < 0) y = board.length - 1;
      else if (j + dir[1] >= board.length) y = 0;
      else y = j + dir[1];

      return [x, y];
    }).reduce(countNeighborsReducer, 0);
  }


  debug() {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(this.state));
  }

  render() {
    const { state } = this;
    return (
      <div>
        <button type="button" onClick={this.debug}>debug</button>
        <button type="button" onClick={() => window.location.reload()}>Reset</button>
        <div>
          <Header
            increaseRows={this.increaseRows}
            decreaseRows={this.decreaseRows}
            increaseCols={this.increaseCols}
            decreaseCols={this.decreaseCols}
            flipCells={this.calcNextGeneration}
          />
        </div>
        <div>
          <GameBoard values={state.board} handleClick={this.flipCell} />
        </div>
      </div>
    );
  }
}

export default App;
