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

    let linesClassNames = `linesContainer`;
    if (this.props.lineStatus.top === "hover") {
      linesClassNames += " topHover";
    }
    if (this.props.lineStatus.right === "hover") {
      linesClassNames += " rightHover";
    }
    if (this.props.lineStatus.bottom === "hover") {
      linesClassNames += " bottomHover";
    }
    if (this.props.lineStatus.left === "hover") {
      linesClassNames += " leftHover";
    }

    if (this.props.lineStatus.top === "placed") {
      linesClassNames += " topPlaced";
    }
    if (this.props.lineStatus.right === "placed") {
      linesClassNames += " rightPlaced";
    }
    if (this.props.lineStatus.bottom === "placed") {
      linesClassNames += " bottomPlaced";
    }
    if (this.props.lineStatus.left === "placed") {
      linesClassNames += " leftPlaced";
    }

    return (
      <div
        className="squareContainer"
        onClick={this.props.onClick}
        onMouseMove={this.props.onMouseMove}
        onMouseLeave={this.props.onMouseLeave}
      >
        {usingDots}
        <div className={linesClassNames} />
        {this.renderLineHitBox("top")}
        {this.renderLineHitBox("right")}
        {this.renderLineHitBox("bottom")}
        {this.renderLineHitBox("left")}
      </div>
    );
  }
}

export default Square;
