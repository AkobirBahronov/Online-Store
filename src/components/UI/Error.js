import React, { Component } from "react";

import classes from "./Error.module.css";

class Error extends Component {
  render() {
    return <div className={classes.error}>Error: {this.props.error}</div>;
  }
}

export default Error;
