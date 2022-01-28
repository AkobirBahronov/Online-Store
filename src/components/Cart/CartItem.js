import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAttribute from "../products/ProductAttribute";

import classes from "./CartItem.module.css";

class CartItem extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedAttributes: props.product.selectedAttributes,
      selectedImage: 0,
      number: props.product.number,
    };
  }

  changeImage(backward) {
    this.setState((prevState) => ({
      selectedImage:
        (backward
          ? prevState.selectedImage - 1 + this.props.product.gallery.length
          : prevState.selectedImage + 1) % this.props.product.gallery.length,
    }));
  }
  render() {
    const {
      product,
      isMiniCart,
      selectedCurrencyId,
      onAddElement,
      onReduceElement,
    } = this.props;

    const productAttributes = (
      <div>
        {product.attributes.map((attribute) => (
          <div key={attribute.name}>
            <div className={classes["attribute-name"]}>{attribute.name}:</div>
            <ProductAttribute
              forMiniCart={isMiniCart}
              forCart
              attribute={attribute}
              selectedAttributes={this.state.selectedAttributes}
            />
          </div>
        ))}
      </div>
    );

    const cartItemClassName = `${classes["cart-item"]} ${
      isMiniCart ? classes["mini"] : ""
    }`;

    const productPrice =
      product.prices[selectedCurrencyId].currency.symbol +
      product.prices[selectedCurrencyId].amount;

    return (
      <div className={cartItemClassName}>
        <div className={classes.detail}>
          <h3>{product.brand}</h3>
          <h4>{product.name}</h4>
          <div className={classes.price}>{productPrice}</div>
          {productAttributes}
        </div>
        <section>
          <div className={classes.number}>
            <button onClick={onAddElement}>+</button>
            <h3>{product.number}</h3>
            <button onClick={onReduceElement}>-</button>
          </div>
          <div className={classes.image}>
            {isMiniCart || product.gallery.length === 1 ? (
              <img src={product.gallery[0]} alt="image1" />
            ) : (
              <>
                <button
                  className={classes["left-vector"]}
                  onClick={this.changeImage.bind(this, true)}
                >
                  {"<"}
                </button>
                <img
                  src={product.gallery[this.state.selectedImage]}
                  alt="image1"
                />
                <button
                  className={classes["right-vector"]}
                  onClick={this.changeImage.bind(this, false)}
                >
                  {">"}
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrencyId: state.selectedCurrencyId,
  };
};

export default connect(mapStateToProps, null)(CartItem);
