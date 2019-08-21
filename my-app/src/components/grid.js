import React from "react";
import PropsType from "prop-types";
import Square from "./square";
import { checkPointOnTriangle, inverseDirection } from "../helper";

class Grid extends React.Component {
  static propsTypes = {
    squares: PropsType.object.isRequired,
    gridWidth: PropsType.number.isRequired,
    gridHeight: PropsType.number.isRequired,
    getSquareNeighbor: PropsType.func.isRequired,
    removeAllLineHovers: PropsType.func.isRequired,
    onLineClick: PropsType.func.isRequired
  };

  onSquareClick(e) {
    const squareElm = e.target.parentElement;
    const mousePos = {
      x: e.clientX - squareElm.offsetLeft,
      y: e.clientY - squareElm.offsetTop
    };

    const orientation = this.squareTriCheck(squareElm, mousePos);
    console.log(orientation);
  }

  onSquareHover = (e, square) => {
    const squareElm = e.target.parentElement;
    const mousePos = {
      x: e.clientX - squareElm.offsetLeft,
      y: e.clientY - squareElm.offsetTop
    };
    const orientation = this.squareTriCheck(squareElm, mousePos);

    this.props.removeAllLineHovers();

    if (orientation) {
      const neigbor = this.props.getSquareNeighbor(square.key, orientation);
      if (neigbor) {
        this.props.setLineStatus(
          neigbor.key,
          inverseDirection(orientation),
          "hover"
        );
      }
      this.props.setLineStatus(square.key, orientation, "hover");
    }
  };

  onSquareLeave = (e, square) => {
    this.props.removeAllLineHovers();
  };

  squareTriCheck(squareElm, mousePos) {
    if (
      mousePos.y < squareElm.offsetHeight / 2 &&
      checkPointOnTriangle(
        mousePos,
        { x: 0, y: 0 },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: squareElm.offsetWidth, y: 0 }
      )
    ) {
      return "top";
    } else if (
      mousePos.x > squareElm.offsetWidth / 2 &&
      checkPointOnTriangle(
        mousePos,
        { x: squareElm.offsetWidth, y: 0 },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: squareElm.offsetWidth, y: squareElm.offsetHeight }
      )
    ) {
      return "right";
    } else if (
      mousePos.y > squareElm.offsetHeight / 2 &&
      checkPointOnTriangle(
        mousePos,
        { x: 0, y: squareElm.offsetHeight },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: squareElm.offsetWidth, y: squareElm.offsetHeight }
      )
    ) {
      return "bottom";
    } else if (
      mousePos.x < squareElm.offsetWidth / 2 &&
      checkPointOnTriangle(
        mousePos,
        { x: 0, y: 0 },
        { x: squareElm.offsetWidth / 2, y: squareElm.offsetHeight / 2 },
        { x: 0, y: squareElm.offsetHeight }
      )
    ) {
      return "left";
    }
  }

  renderSquare(square) {
    return (
      <Square
        gridPos={square.gridPos}
        key={square.key}
        neigbors={square.neigbors}
        lineStatus={square.lineStatus}
        onClick={e => this.onSquareClick(e)}
        onMouseMove={e => this.onSquareHover(e, square)}
        onMouseLeave={e => this.onSquareLeave(e, square)}
      />
    );
  }

  render() {
    if (!this.props.squares) {
      return <p>loading...</p>;
    }

    let squareId = 0;
    const rows = [];
    for (let r = 0; r < this.props.gridHeight; r++) {
      const cols = [];
      for (let c = 0; c < this.props.gridWidth; c++) {
        rows.push(this.renderSquare(this.props.squares[`square_${squareId}`]));
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
}

export default Grid;
