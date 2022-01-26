import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactHtmlParser from "html-react-parser";
import ProductAttribute from "./ProductAttribute";

import classes from "./ProductDetailInfo.module.css";

class ProductDetailInfo extends Component {
  constructor() {
    super();
    this.state = { selectedAttributes: {}, addingIsValid: true };
  }

  attributeClickHandler(name, value) {
    this.setState((prevState) => {
      let selectedAttributes = {
        ...prevState.selectedAttributes,
      };
      selectedAttributes[`${name}`] = value;
      return { selectedAttributes };
    });
    this.setState({ addingIsValid: true });
  }

  addToCartHandler(event) {
    const { selectedAttributes } = this.state;
    const { product } = this.props;
    if (Object.keys(selectedAttributes).length < product.attributes.length) {
      this.setState({ addingIsValid: false });
      event.preventDefault();
    } else {
      let id = product.id;
      for (let i = 0; i < Object.keys(selectedAttributes).length; i++) {
        id += "-" + selectedAttributes[product.attributes[i].name];
      }
      this.props.addToCart({ ...product, id, selectedAttributes });
    }
  }
  render() {
    const { selectedAttributes, addingIsValid } = this.state;
    const { product } = this.props;

    const productAttributes = product.attributes.map((attribute) => (
      <div className={classes.attributes} key={attribute.name}>
        <h4>{attribute.name}:</h4>
        <ProductAttribute
          attributeClickHandler={this.attributeClickHandler.bind(this)}
          attribute={attribute}
          selectedAttributes={selectedAttributes}
        />
      </div>
    ));

    const productPrice =
      product.prices[this.props.selectedCurrencyId].currency.symbol +
      product.prices[this.props.selectedCurrencyId].amount;
    return (
      <div className={classes.info}>
        <h2>{product.brand}</h2>
        <div className={classes.name}>{product.name}</div>
        {productAttributes}
        <h4>Price:</h4>
        <div className={classes.price}>{productPrice}</div>
        <Link to={"/"}>
          <button
            onClick={this.addToCartHandler.bind(this)}
            className={!addingIsValid ? classes.invalid : ""}
            disabled={product.inStock ? false : true}
          >
            ADD TO CART
          </button>
        </Link>
        {!product.inStock && (
          <p className={classes.warning}>
            This product is out of Stock now, please come later!
          </p>
        )}
        {!addingIsValid && (
          <p className={classes.invalid}>
            Please, select attributes before adding to Cart!
          </p>
        )}
        <div className={classes.description}>
          {ReactHtmlParser(product.description)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrencyId: state.selectedCurrencyId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch({ type: "addToCart", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailInfo);
