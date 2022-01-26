import React, { Component } from "react";

import classes from "./Currencies.module.css";

class Currencies extends Component {
  render() {
    return (
      <div className={classes.currencies}>
        {this.props.currencies.map((currency, id) => (
          <div
            key={currency.label}
            onClick={() => this.props.onChangeCurrencyId(id)}
          >
            {currency.symbol + " " + currency.label}
          </div>
        ))}
      </div>
    );
  }
}

export default Currencies;
