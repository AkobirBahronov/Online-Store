import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../components/Cart/CartItem";

import classes from "./Cart.module.css";

class Cart extends Component {
  render() {
    return (
      <div className={classes.cart}>
        <div className={classes.title}>Cart</div>
        {this.props.cart.map((product) => (
          <div key={product.id}>
            <hr />
            <CartItem
              product={product}
              onAddElement={() => this.props.addToCart(product)}
              onReduceElement={() => this.props.removeFromCart(product)}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch({ type: "addToCart", payload }),
    removeFromCart: (payload) => dispatch({ type: "removeFromCart", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
