import React from "react";

export default class Line extends React.Component {
  render() {
    if (this.props.orientation === "top") {
      return <div className="line lineTop"></div>;
    } else if (this.props.orientation === "right") {
      return <div className="line lineRight"></div>;
    } else if (this.props.orientation === "bottom") {
      return <div className="line lineBottom"></div>;
    } else if (this.props.orientation === "left") {
      return <div className="line lineLeft"></div>;
    }
  }
}
