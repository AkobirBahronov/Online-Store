import React, { Component } from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";

class Backdrop extends Component {
  render() {
    return ReactDOM.createPortal(
      <div className={classes.backdrop} onClick={this.props.onClick}></div>,
      document.getElementById("backdrop")
    );
  }
}

export default Backdrop;
