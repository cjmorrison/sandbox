import PropsType from "prop-types";
import React from "react";

const Line = props => {
  let classNames = `line ${props.orientation}`;
  if (props.status) {
    classNames += ` ${props.status}`;
  }
  return <div className={classNames}></div>;
};

Line.propsTypes = {
  orientation: PropsType.string.isRequired,
  status: PropsType.string.isRequired
};

export default Line;
