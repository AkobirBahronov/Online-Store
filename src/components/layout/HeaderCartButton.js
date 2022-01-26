import React, { Component } from "react";
import { connect } from "react-redux";
import emptyCart from "../../icons/emptyCart.svg";

import classes from "./HeaderCartButton.module.css";

class HeaderCartButton extends Component {
  constructor() {
    super();
    this.state = { btnHighlighted: false };
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.cart !== this.props.cart) {
      if (this.props.cart.length === 0) {
        return;
      }
      this.setState({ btnHighlighted: true });

      const timer = setTimeout(() => {
        this.setState({ btnHighlighted: false });
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }

  render() {
    let totalCartNumber = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      totalCartNumber += this.props.cart[i].number;
    }
    const btnClasses = `${classes["cart-btn"]} ${
      this.state.btnHighlighted && classes.bump
    }`;

    return (
      <button className={btnClasses} onClick={this.props.onShowCart}>
        <img className={classes["empty-cart"]} src={emptyCart} alt="cart" />
        {this.props.cart.length > 0 && (
          <div className={classes.number}> {totalCartNumber}</div>
        )}
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(HeaderCartButton);
