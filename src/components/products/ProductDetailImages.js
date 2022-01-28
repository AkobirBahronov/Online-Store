import React, { Component } from "react";

import classes from "./ProductDetailImages.module.css";

class ProductDetailImages extends Component {
  constructor(props) {
    super();
    this.state = { activeImage: props.images[0] };
  }

  displaySmImages(images) {
    return images.map((img) => (
      <img
        src={img}
        alt="img"
        key={img}
        onClick={() => this.setState({ activeImage: img })}
      />
    ));
  }

  render() {
    const { images, inStock } = this.props;

    const smImagesVr = images.length > 5 ? images.slice(0, 4) : images;
    const smImagesHr = images.length > 5 ? images.slice(4) : null;

    const activeImageClassName = `${classes["active-image"]} ${
      !inStock ? classes.unavailable : ""
    }`;

    return (
      <div className={classes.images}>
        <div className={classes.container}>
          <div className={classes["images-vr"]}>
            {this.displaySmImages.bind(this, smImagesVr)()}
          </div>
          <div className={activeImageClassName}>
            <img src={this.state.activeImage} alt="activeImage" />
            {!inStock && <p>OUT OF STOCK</p>}
          </div>
        </div>
        {!!smImagesHr && (
          <div className={classes["images-hr"]}>
            {this.displaySmImages.bind(this, smImagesHr)()}
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetailImages;
