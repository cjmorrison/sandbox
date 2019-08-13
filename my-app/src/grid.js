import React from "react";
import Square from "./square.js";
import "./index.css";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridWidth: 10,
      gridHeight: 10
    };
  }

  renderSquare(i) {
    return (
      <Square
        key={"square_" + i}
        value={this.props.squares[i]}
        onClick={e => this.onSquareClick(e)}
        onMouseMove={e => this.onSquareHover(e)}
        onMouseLeave={e => this.onSquareLeave(e)}
      />
    );
  }

  render() {
    let squareId = 0;
    const rows = [];
    for (let r = this.state.gridHeight - 1; r >= 0; r--) {
      const cols = [];
      for (let c = this.state.gridWidth - 1; c >= 0; c--) {
        cols.push(this.renderSquare(squareId));
        squareId++;
      }
      rows.push(
        <div key={"row_" + (rows.length + 1)} className="board-row">
          {cols}
        </div>
      );
    }

    return <div>{rows}</div>;
  }

  onSquareClick(e) {
    const squareElm = e.target.parentElement;
    const mousePos = {
      x: e.clientX - squareElm.offsetLeft,
      y: e.clientY - squareElm.offsetTop
    };

    const orientation = this.squareTriCheck(squareElm, mousePos);
    console.log(orientation);
  }

  onSquareHover(e) {
    const squareElm = e.target.parentElement;
    const mousePos = {
      x: e.clientX - squareElm.offsetLeft,
      y: e.clientY - squareElm.offsetTop
    };

    const orientation = this.squareTriCheck(squareElm, mousePos);

    if (orientation === "top") {
      squareElm.getElementsByClassName("lineTop")[0].classList.add("hover");
    } else {
      squareElm.getElementsByClassName("lineTop")[0].classList.remove("hover");
    }

    if (orientation === "right") {
      squareElm.getElementsByClassName("lineRight")[0].classList.add("hover");
    } else {
      squareElm
        .getElementsByClassName("lineRight")[0]
        .classList.remove("hover");
    }

    if (orientation === "bottom") {
      squareElm.getElementsByClassName("lineBottom")[0].classList.add("hover");
    } else {
      squareElm
        .getElementsByClassName("lineBottom")[0]
        .classList.remove("hover");
    }

    if (orientation === "left") {
      squareElm.getElementsByClassName("lineLeft")[0].classList.add("hover");
    } else {
      squareElm.getElementsByClassName("lineLeft")[0].classList.remove("hover");
    }
  }

  onSquareLeave(e) {
    const squareElm = e.target.parentElement;

    squareElm.getElementsByClassName("lineTop")[0].classList.remove("hover");
    squareElm.getElementsByClassName("lineRight")[0].classList.remove("hover");
    squareElm.getElementsByClassName("lineBottom")[0].classList.remove("hover");
    squareElm.getElementsByClassName("lineLeft")[0].classList.remove("hover");
  }

  squareTriCheck(squareElm, mousePos) {
    if (
      mousePos.y < squareElm.offsetHeight / 2 &&
      this.checkPointOnTriangle(
        mousePos,
        { x: 0, y: 0 },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: squareElm.offsetWidth, y: 0 }
      )
    ) {
      return "top";
    } else if (
      mousePos.x > squareElm.offsetWidth / 2 &&
      this.checkPointOnTriangle(
        mousePos,
        { x: squareElm.offsetWidth, y: 0 },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: squareElm.offsetWidth, y: squareElm.offsetHeight }
      )
    ) {
      return "right";
    } else if (
      mousePos.y > squareElm.offsetHeight / 2 &&
      this.checkPointOnTriangle(
        mousePos,
        { x: 0, y: squareElm.offsetHeight },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: squareElm.offsetWidth, y: squareElm.offsetHeight }
      )
    ) {
      return "bottom";
    } else if (
      mousePos.x < squareElm.offsetWidth / 2 &&
      this.checkPointOnTriangle(
        mousePos,
        { x: 0, y: 0 },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: 0, y: squareElm.offsetHeight }
      )
    ) {
      return "left";
    }
  }

  checkPointOnTriangle(checkPoint, triVertA, triVertB, triVertC) {
    // my reaserch lead me to the Barycentric coordinate system I found a few differnt algorithms on this, some more effecient then this one.
    // this one however, was easier to understand.
    // https://stackoverflow.com/questions/13300904/determine-whether-point-lies-inside-triangle (answer by user kevintodisco)

    const alpha =
      ((triVertB.y - triVertC.y) * (checkPoint.x - triVertC.x) +
        (triVertC.x - triVertB.x) * (checkPoint.y - triVertC.y)) /
      ((triVertB.y - triVertC.y) * (triVertA.x - triVertC.x) +
        (triVertC.x - triVertB.x) * (triVertA.y - triVertC.y));
    const beta =
      ((triVertC.y - triVertA.y) * (checkPoint.x - triVertC.x) +
        (triVertA.x - triVertC.x) * (checkPoint.y - triVertC.y)) /
      ((triVertB.y - triVertC.y) * (triVertA.x - triVertC.x) +
        (triVertC.x - triVertB.x) * (triVertA.y - triVertC.y));
    const gamma = 1 - alpha - beta;

    if (alpha > 0 && beta > 0 && gamma > 0) {
      return true;
    } else {
      return false;
    }
  }
}
