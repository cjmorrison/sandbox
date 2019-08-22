import PropsType from "prop-types";
import React from "react";

const LineHitBox = props => {
  let classNames = `lineHitBox ${props.orientation}`;
  if (props.status) {
    classNames += ` ${props.status}`;
  }
  return <div className={classNames}></div>;
};

LineHitBox.propsTypes = {
  orientation: PropsType.string.isRequired,
  status: PropsType.string.isRequired
};

export default LineHitBox;
