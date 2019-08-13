import React from "react";
import Line from "./line.js";

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      neigbors: [],
      lineNodes: []
    };
  }

  renderLine(orientation) {
    return <Line orientation={orientation} />;
  }

  render() {
    return (
      <div
        className="squareContainer"
        onClick={this.props.onClick}
        onMouseMove={this.props.onMouseMove}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.renderLine("top")}
        {this.renderLine("right")}
        {this.renderLine("bottom")}
        {this.renderLine("left")}
      </div>
    );

    /*
    <!--
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    -->
    */
  }
}
