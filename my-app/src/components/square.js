import React from "react";
import PropsType from "prop-types";
import LineHitBox from "./lineHitBox.js";

class Square extends React.Component {
  static propsTypes = {
    gridPos: PropsType.string.isRequired,
    key: PropsType.string.isRequired,
    neigbors: PropsType.shape({
      top: PropsType.string.isRequired,
      right: PropsType.string.isRequired,
      bottom: PropsType.string.isRequired,
      left: PropsType.string.isRequired
    }),
    lineStatus: PropsType.shape({
      top: PropsType.string.isRequired,
      right: PropsType.string.isRequired,
      bottom: PropsType.string.isRequired,
      left: PropsType.string.isRequired
    }),
    playerInfo: PropsType.array.isRequired,
    currentPlayer: PropsType.array.isRequired,
    onClick: PropsType.func.isRequired,
    onMouseMove: PropsType.func.isRequired,
    onMouseLeave: PropsType.func.isRequired
  };

  renderLineHitBox(orientation) {
    return (
      <LineHitBox
        status={this.props.lineStatus[orientation]}
        orientation={orientation}
      />
    );
  }

  render() {
    const usingDots = [<div key={0} className="dot topLeft" />];

    if (!this.props.neigbors.right) {
      usingDots.push(<div key={1} className="dot topRight" />);
    }

    if (!this.props.neigbors.right && !this.props.neigbors.bottom) {
      usingDots.push(<div key={2} className="dot last bottomLeft" />);
      usingDots.push(<div key={3} className="dot last bottomRight" />);
    } else if (!this.props.neigbors.bottom) {
      usingDots.push(<div key={2} className="dot bottomLeft" />);
    }

    const lineStyles = {};
    let playerNum = this.props.currentPlayer;
    let playerColor = this.props.playerInfo[playerNum - 1].color;
    const hoverOpacity = 0.5;
    if (this.props.lineStatus.top === "hover") {
      lineStyles.borderTopColor = `rgba(${playerColor[0]}, ${playerColor[1]}, ${
        playerColor[2]
      }, ${hoverOpacity})`;
    }
    if (this.props.lineStatus.right === "hover") {
      lineStyles.borderRightColor = `rgba(${playerColor[0]}, ${
        playerColor[1]
      }, ${playerColor[2]}, ${hoverOpacity})`;
    }
    if (this.props.lineStatus.bottom === "hover") {
      lineStyles.borderBottomColor = `rgba(${playerColor[0]}, ${
        playerColor[1]
      }, ${playerColor[2]}, ${hoverOpacity})`;
    }
    if (this.props.lineStatus.left === "hover") {
      lineStyles.borderLeftColor = `rgba(${playerColor[0]}, ${
        playerColor[1]
      }, ${playerColor[2]}, ${hoverOpacity})`;
    }

    if (
      this.props.lineStatus.top &&
      this.props.lineStatus.top.indexOf("placedByPlayer_") === 0
    ) {
      playerNum = parseInt(
        this.props.lineStatus.top.replace("placedByPlayer_", "")
      );
      playerColor = this.props.playerInfo[playerNum - 1].color;
      lineStyles.borderTopColor = `rgba(${playerColor[0]}, ${playerColor[1]}, ${
        playerColor[2]
      }, 1)`;
    }
    if (
      this.props.lineStatus.right &&
      this.props.lineStatus.right.indexOf("placedByPlayer_") === 0
    ) {
      playerNum = parseInt(
        this.props.lineStatus.right.replace("placedByPlayer_", "")
      );
      playerColor = this.props.playerInfo[playerNum - 1].color;
      lineStyles.borderRightColor = `rgba(${playerColor[0]}, ${
        playerColor[1]
      }, ${playerColor[2]}, 1)`;
    }
    if (
      this.props.lineStatus.bottom &&
      this.props.lineStatus.bottom.indexOf("placedByPlayer_") === 0
    ) {
      playerNum = parseInt(
        this.props.lineStatus.bottom.replace("placedByPlayer_", "")
      );
      playerColor = this.props.playerInfo[playerNum - 1].color;
      lineStyles.borderBottomColor = `rgba(${playerColor[0]}, ${
        playerColor[1]
      }, ${playerColor[2]}, 1)`;
    }
    if (
      this.props.lineStatus.left &&
      this.props.lineStatus.left.indexOf("placedByPlayer_") === 0
    ) {
      playerNum = parseInt(
        this.props.lineStatus.left.replace("placedByPlayer_", "")
      );
      playerColor = this.props.playerInfo[playerNum - 1].color;
      lineStyles.borderLeftColor = `rgba(${playerColor[0]}, ${
        playerColor[1]
      }, ${playerColor[2]}, 1)`;
    }

    return (
      <div
        className="squareContainer"
        onClick={this.props.onClick}
        onMouseMove={this.props.onMouseMove}
        onMouseLeave={this.props.onMouseLeave}
      >
        {usingDots}
        <div className="linesContainer" style={lineStyles} />
        {this.renderLineHitBox("top")}
        {this.renderLineHitBox("right")}
        {this.renderLineHitBox("bottom")}
        {this.renderLineHitBox("left")}
      </div>
    );
  }
}

export default Square;
