import React, { Component } from "react";

import classes from "./LoadingSpinner.module.css";

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={classes.overlay}>
        <div className={classes["spinner"]}>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
          <div className={classes["spinner-blade"]}></div>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
