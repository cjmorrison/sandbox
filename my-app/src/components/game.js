import React from "react";
import Grid from "./grid.js";

class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    // leaving my options open for a potential 3 player mode with hexigons
    playerInfo: [
      {
        name: "The Vermilion Palisades",
        color: [227, 66, 52],
        score: 0
      },
      {
        name: "The Ceylon Barriars",
        color: [100, 149, 237],
        score: 0
      }
    ],
    gridWidth: 4,
    gridHeight: 4,
    squares: null,
    stepNumber: 0,
    currentPlayer: 1
  };

  componentDidMount() {
    this.setState({
      currentPlayer:
        Math.floor(Math.random() * Math.floor(this.state.playerInfo.length)) + 1
    });

    this.defineSquares();
  }

  /*
  // may add this back in sorry for the mess. at very least I'll want a single undo method for misclicks
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
  */

  handleTurnEnd = () => {
    const scoredSquares = this.SetScoredSquares();
    if (scoredSquares.length) {
      for (const scoredSquare in scoredSquares) {
        this.setSquareStatus(
          scoredSquares[scoredSquare].key,
          "scoredBy_" + this.state.currentPlayer
        );
        this.setPlayerScore(
          this.state.currentPlayer,
          this.state.playerInfo[this.state.currentPlayer - 1].score + 1
        );
      }
      this.checkWin();
    } else {
      this.selectNextPlayer();
    }
  };

  SetScoredSquares = () => {
    const scoredSquares = [];
    for (const squareID of Object.keys(this.state.squares)) {
      const square = this.state.squares[squareID];
      let denied = false;
      if (square.status === "open") {
        for (const line of Object.keys(square.lineStatus)) {
          if (
            !square.lineStatus[line] ||
            square.lineStatus[line].indexOf("placedByPlayer_") === -1
          ) {
            denied = true;
            break;
          }
        }
        if (denied) {
          continue;
        }
        scoredSquares.push(square);
      }
    }
    return scoredSquares;
  };

  checkWin = () => {
    let scoreTotal = 0;

    for (const p in this.state.playerInfo) {
      const player = this.state.playerInfo[p];
      scoreTotal += player.score;
    }
    if (scoreTotal !== Object.keys(this.state.squares).length) {
      return;
    }

    const players = [...this.state.playerInfo];
    players.sort(function(a, b) {
      return a.score + b.score;
    });
    let winners = [];
    for (const w in players) {
      if (winners.length) {
        if (winners[winners.length - 1].score == players[w].score) {
          winners.push(players[w]);
        } else if (winners[winners.length - 1].score < players[w].score) {
          winners = [players[w]];
        }
      } else {
        winners.push(players[w]);
      }
    }
    if (winners.length === 1) {
      alert(`${winners[0].name} has won`);
    } else {
      alert(`the game has tied`);
    }
  };

  selectNextPlayer = () => {
    if (this.state.currentPlayer === this.state.playerInfo.length) {
      this.setState({
        currentPlayer: 1
      });
    } else {
      this.setState({
        currentPlayer: this.state.currentPlayer + 1
      });
    }
  };

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
          status: "open",
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

  setPlayerScore = (playerNumber, score) => {
    const players = [...this.state.playerInfo];
    players[playerNumber - 1].score = score;
    this.setState({ playerInfo: players });
  };

  setSquareStatus = (squareKey, status) => {
    const squares = { ...this.state.squares };
    squares[squareKey].status = status;
    this.setState({ squares: squares });
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
          squares[squareKey].lineStatus[lineStat] = null;
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
    /*
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
    */

    let status;
    const winner = false;

    let player = this.state.playerInfo[this.state.currentPlayer - 1];
    const statusColor = {
      color: `rgb(${player.color[0]}, ${player.color[1]}, ${player.color[2]})`
    };

    const score = [];
    for (const p in this.state.playerInfo) {
      player = this.state.playerInfo[p];
      const style = {
        color: `rgb(${player.color[0]}, ${player.color[1]}, ${player.color[2]})`
      };
      score.push(
        <span style={style} key={p + "_score"}>
          {player.score}
        </span>
      );
      if (parseInt(p) !== this.state.playerInfo.length - 1) {
        score.push("|");
      }
    }

    player = this.state.playerInfo[this.state.currentPlayer - 1];
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = (
        <div>
          Current Player:
          <br />
          <strong style={statusColor}>{player.name}</strong>
          <br />
          <br />
          Score:
          <br />
          {score}
        </div>
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Grid
            squares={this.state.squares}
            playerInfo={this.state.playerInfo}
            currentPlayer={this.state.currentPlayer}
            gridWidth={this.state.gridWidth}
            gridHeight={this.state.gridHeight}
            setLineStatus={this.setLineStatus}
            removeAllLineHovers={this.removeAllLineHovers}
            getSquareNeighbor={this.getSquareNeighbor}
            handleTurnEnd={this.handleTurnEnd}
          />
        </div>
        <div className="game-info">
          {status}
          {/* }<ol>{moves}</ol>{ */}
        </div>
      </div>
    );
  }
}

export default Game;
