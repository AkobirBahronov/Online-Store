import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import addCartIcon from "../../icons/addCartIcon.svg";

import classes from "./ProductCard.module.css";

class ProductsList extends Component {
  constructor() {
    super();
    this.state = { isAddIconVisible: false };
  }

  addToCartHandler(event) {
    event.preventDefault();
    const { product, addToCart } = this.props;
    let id = product.id;
    let selectedAttributes = {};
    for (let i = 0; i < product.attributes.length; i++) {
      id += "-" + product.attributes[i].items[0].value;
      selectedAttributes[product.attributes[i].name] =
        product.attributes[i].items[0].value;
    }
    addToCart({ ...product, id, selectedAttributes });
  }

  render() {
    const { selectedCurrencyId, product } = this.props;

    const addToCartIcon =
      product.inStock && this.state.isAddIconVisible ? (
        <div
          className={classes.icon}
          onClick={this.addToCartHandler.bind(this)}
        >
          <img src={addCartIcon} alt="add-cart-icon" />
        </div>
      ) : (
        ""
      );

    const cardClasses = `${classes.card} ${
      !product.inStock && classes.unavailable
    }`;

    return (
      <Link to={`/${product.category}/${product.id}`}>
        <div
          className={cardClasses}
          onMouseEnter={() => this.setState({ isAddIconVisible: true })}
          onMouseLeave={() => this.setState({ isAddIconVisible: false })}
        >
          <div className={classes.image}>
            <img src={product.gallery[0]} alt={product.name} />
            {!product.inStock && <p>OUT OF STOCK</p>}
          </div>
          <div className={classes.content}>
            <p className={classes.name}>{product.brand + " " + product.name}</p>
            <div className={classes.prices}>
              <p>
                {product.prices[selectedCurrencyId].currency.symbol +
                  product.prices[selectedCurrencyId].amount}
              </p>
            </div>
            {addToCartIcon}
          </div>
        </div>
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
