import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Backdrop from "../UI/Backdrop";
import CartItem from "./CartItem";

import classes from "./MiniCart.module.css";

class MiniCart extends Component {
  render() {
    const {
      cart,
      selectedCurrencyId,
      onCloseMiniCart,
      addToCart,
      removeFromCart,
    } = this.props;
    const currencySymbol = cart[0]?.prices[selectedCurrencyId].currency.symbol;

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].prices[selectedCurrencyId].amount * cart[i].number;
    }

    return (
      <div>
        <Backdrop onClick={onCloseMiniCart} />
        <div className={classes["mini-cart"]}>
          <span>My Bag,</span> {cart.length} items
          <div className={classes.container}>
            {cart.map((product) => (
              <CartItem
                key={product.id}
                isMiniCart
                product={product}
                onAddElement={() => addToCart(product)}
                onReduceElement={() => removeFromCart(product)}
              />
            ))}
          </div>
          <div className={classes["total-price"]}>
            <div>Total</div>
            <div className={classes.price}>
              {currencySymbol}
              {totalPrice.toFixed(2)}
            </div>
          </div>
          <div className={classes.btn}>
            <Link to="/cart">
              <button onClick={onCloseMiniCart}>VIEW BAG</button>
            </Link>
            <button
              onClick={onCloseMiniCart}
              className={classes["checkout-btn"]}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    selectedCurrencyId: state.selectedCurrencyId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch({ type: "addToCart", payload }),
    removeFromCart: (payload) => dispatch({ type: "removeFromCart", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
