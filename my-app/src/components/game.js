import React from "react";
import Grid from "./grid.js";

class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    gridWidth: 10,
    gridHeight: 10,
    squares: null,
    stepNumber: 0,
    xIsNext: true
  };

  componentDidMount() {
    this.defineSquares();
  }

  /*
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  defineSquares = () => {
    const squares = [];
    let squareId = 0;
    for (let r = 0; r < this.state.gridHeight; r++) {
      for (let c = 0; c < this.state.gridWidth; c++) {
        const neigbors = {
          top: null,
          right: null,
          bottom: null,
          left: null
        };

        if (r - 1 !== -1) {
          neigbors.top = `${r - 1},${c}`;
        }

        if (c !== this.state.gridWidth - 1) {
          neigbors.right = `${r},${c + 1}`;
        }

        if (r !== this.state.gridHeight - 1) {
          neigbors.bottom = `${r + 1},${c}`;
        }

        if (c - 1 !== -1) {
          neigbors.left = `${r},${c - 1}`;
        }

        squares[`square_${squareId}`] = {
          gridPos: `${r},${c}`,
          key: `square_${squareId}`,
          neigbors: neigbors,
          lineStatus: {
            top: null,
            right: null,
            bottom: null,
            left: null
          }
        };
        squareId++;
      }
    }

    this.setState({
      squares: squares
    });
  };

  setLineStatus = (squareKey, line, status) => {
    const squares = { ...this.state.squares };
    if (line) {
      squares[squareKey].lineStatus[line] = status;
    }
    this.setState({ squares: squares });
  };

  removeAllLineHovers = () => {
    const squares = { ...this.state.squares };
    for (const squareKey in this.state.squares) {
      for (const lineStat in this.state.squares[squareKey].lineStatus) {
        if (this.state.squares[squareKey].lineStatus[lineStat] === "hover") {
          this.state.squares[squareKey].lineStatus[lineStat] = null;
        }
      }
    }
    this.setState({ squares: squares });
  };

  getSquareNeighbor = (squareKey, nDirection) => {
    const neighborPos = this.state.squares[squareKey].neigbors[nDirection];
    if (!neighborPos) {
      return null;
    }

    return this.getSquareByPosision(
      neighborPos.split(",")[0],
      neighborPos.split(",")[1]
    );
  };

  getSquareByPosision = (r, c) => {
    for (const squareKey in this.state.squares) {
      if (this.state.squares[squareKey].gridPos === `${r},${c}`) {
        return this.state.squares[squareKey];
      }
    }
    return false;
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Grid
            squares={this.state.squares}
            gridWidth={this.state.gridWidth}
            gridHeight={this.state.gridHeight}
            setLineStatus={this.setLineStatus}
            removeAllLineHovers={this.removeAllLineHovers}
            getSquareNeighbor={this.getSquareNeighbor}
            onLineClick={e => this.handleLineClick(e)}
          />
        </div>
        {/* }
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        { */}
      </div>
    );
  }
}

export default Game;
