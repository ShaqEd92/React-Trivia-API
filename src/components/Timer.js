import React, { Fragment } from "react";
import "../styles/App.css";

const Timer = (props) => {
  return <Fragment>{props.started && <h1>{props.secondsLeft}</h1>}</Fragment>;
};

export default Timer;
