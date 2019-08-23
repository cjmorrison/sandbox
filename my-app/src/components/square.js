import React from "react";
import PropsType from "prop-types";
import LineHitBox from "./lineHitBox";
import PlayerFlag from "./playerFlag";
import { rgbToHex } from "../helper";

class Square extends React.Component {
  static propsTypes = {
    gridPos: PropsType.string.isRequired,
    key: PropsType.string.isRequired,
    status: PropsType.string.isRequired,
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

    let playerNum = this.props.currentPlayer;
    let playerColor = this.props.playerInfo[playerNum - 1].color;
    let iconColor = "#000000";
    let iconOpacity = 0;
    if (this.props.status.indexOf("scoredBy_") === 0) {
      const scoredByPlayer = parseInt(
        this.props.status.replace("scoredBy_", "")
      );
      const scoredByPlayerColor = this.props.playerInfo[scoredByPlayer - 1]
        .color;
      iconColor = rgbToHex(
        scoredByPlayerColor[0],
        scoredByPlayerColor[1],
        scoredByPlayerColor[2]
      );
      iconOpacity = 1;
    }

    const lineStyles = {};
    playerNum = this.props.currentPlayer;

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
        <div className="imageContainer">
          <PlayerFlag color={iconColor} opacity={iconOpacity} />
        </div>
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
