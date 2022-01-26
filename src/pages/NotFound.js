import React, { Component } from "react";

import classes from "./NotFound.module.css";

class NotFound extends Component {
  render() {
    return (
      <div className={classes["not-found"]}>
        <p>Page not found!</p>
      </div>
    );
  }
}

export default NotFound;
