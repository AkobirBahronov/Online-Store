import React, { Component } from "react";

import classes from "./ProductAttribute.module.css";

class ProductAttribute extends Component {
  attributeClickHandler(value) {
    !this.props.forCart &&
      this.props.attributeClickHandler(this.props.attribute.name, value);
  }
  render() {
    const { selectedAttributes, attribute, forCart, forMiniCart } = this.props;

    const attributeClassName = `${classes.attribute} ${
      forCart ? classes.cart : ""
    } ${forMiniCart ? classes.mini : ""} }`;

    const attributeSelectedClassName = (value) => {
      return selectedAttributes[`${attribute.name}`] === value
        ? `${classes.selected} ${
            attribute.type === "swatch" ? classes.swatch : ""
          }`
        : "";
    };

    return (
      <div className={attributeClassName}>
        {attribute.items.map((item) => (
          <div
            key={item.id}
            style={
              attribute.type === "swatch" ? { backgroundColor: item.value } : {}
            }
            className={attributeSelectedClassName(item.value)}
            onClick={this.attributeClickHandler.bind(this, item.value)}
          >
            {attribute.type !== "swatch" && item.value}
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttribute;
