import React from "react";
import PropsType from "prop-types";
import Line from "./line.js";

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
    onClick: PropsType.func.isRequired,
    onMouseMove: PropsType.func.isRequired,
    onMouseLeave: PropsType.func.isRequired
  };

  renderLine(orientation) {
    return (
      <Line
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

    return (
      <div
        className="squareContainer"
        onClick={e => this.props.onClick(e)}
        onMouseMove={this.props.onMouseMove}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.renderLine("top")}
        {this.renderLine("right")}
        {this.renderLine("bottom")}
        {this.renderLine("left")}
        {usingDots}
      </div>
    );
  }
}

export default Square;
