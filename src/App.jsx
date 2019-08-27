/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import './App.css';

import Header from './Components/Header/Header';
import GameBoard from './Components/GameBoard/GameBoard';
import { CELL_STATE } from './Components/Cell/Cell';

const DEFAULTS = Object.freeze({
  WIDTH: 5,
  HEIGHT: 5,
  STATE: CELL_STATE.DEAD,
});

const ALIVE_RULES = Object.freeze({
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

const DEAD_RULES = Object.freeze({
  0: CELL_STATE.DEAD,
  1: CELL_STATE.DEAD,
  2: CELL_STATE.DEAD,
  3: CELL_STATE.ALIVE,
  4: CELL_STATE.DEAD,
  5: CELL_STATE.DEAD,
  7: CELL_STATE.DEAD,
  6: CELL_STATE.DEAD,
  8: CELL_STATE.DEAD,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      keyId: 0,
      generation: 0,
      timerId: 0,
      waitTime: 1000,
      playing: false,
    };

    const { state } = this;

    for (let i = 0; i < DEFAULTS.HEIGHT; i += 1) {
      state.board.push([]);

      for (let j = 0; j < DEFAULTS.WIDTH; j += 1) {
        state.board[i].push({ state: DEFAULTS.STATE, id: state.keyId += 1 });
      }
    }

    this.increaseRows = this.increaseRows.bind(this);
    this.decreaseRows = this.decreaseRows.bind(this);
    this.increaseCols = this.increaseCols.bind(this);
    this.decreaseCols = this.decreaseCols.bind(this);
    this.flipCell = this.flipCell.bind(this);
    this.calcNextGeneration = this.calcNextGeneration.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.randomize = this.randomize.bind(this);

    this.debug = this.debug.bind(this);
  }

  componentDidMount() {
    this.randomize();
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
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
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
    const { board, generation } = this.state;
    const newBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[0].length; j += 1) {
        const nCount = this.countNeighbors(i, j, board);

        if (board[i][j].state === CELL_STATE.ALIVE) {
          newBoard[i][j].state = ALIVE_RULES[nCount];
        } else {
          newBoard[i][j].state = DEAD_RULES[nCount];
        }
      }
    }

    this.setState({ board: newBoard, generation: generation + 1 });
  }

  play() {
    const { state } = this;

    const timerId = setInterval(() => this.calcNextGeneration(), state.waitTime);

    this.setState({ timerId, playing: true });
  }

  pause() {
    const { timerId } = this.state;

    clearInterval(timerId);

    this.setState({ playing: false });
  }

  updateWaitTime(newWaitTime) {
    const { state } = this;
    this.setState({ waitTime: newWaitTime }, () => {
      if (!state.playing) return;

      this.pause();
      this.play();
    });
  }

  randomize() {
    const { board } = this.state;

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        const n = Math.random();
        board[i][j].state = n > 0.7 ? CELL_STATE.ALIVE : CELL_STATE.DEAD;
      }
    }

    this.setState({ board, generation: 0 });
  }

  debug() {
    const { state } = this;
    // eslint-disable-next-line no-console
    console.log(state.board);
  }

  countNeighbors(i, j, board) {
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1], [0, 1], [0, -1], [1, 0], [-1, 0]];

    // eslint-disable-next-line max-len
    const countNeighborsReducer = (acc, [x, y]) => (board[y][x].state === CELL_STATE.ALIVE ? acc + 1 : acc);

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
            calcNextGen={this.calcNextGeneration}
            generation={state.generation}
            play={this.play}
            pause={this.pause}
            waitTime={state.waitTime}
            updateWaitTime={this.updateWaitTime}
            randomize={this.randomize}
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
