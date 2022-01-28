import React, { Component } from "react";
import { fetchingData } from "../store/Helpers";
import Error from "../components/UI/Error";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ProductDetailImages from "../components/products/ProductDetailImages";

import classes from "./ProductDetail.module.css";
import ProductDetailInfo from "../components/products/ProductDetailInfo";
import NotFound from "./NotFound";

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      isLoading: true,
      error: null,
    };
  }
  async componentDidMount() {
    const query = `
    query Product {
      product(id: "${this.props.id}") {
        id
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        } 
      }
    }
  `;
    const { data, error } = await fetchingData(query);
    if (!error) {
      this.setState({ product: data.product });
    } else {
      this.setState({ error });
    }
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    } else if (this.state.error) {
      return <Error error={this.state.error} />;
    } else if (!this.state.product) {
      return <NotFound />;
    }
    return (
      <div className={classes.pdp}>
        <ProductDetailImages
          images={this.state.product.gallery}
          inStock={this.state.product.inStock}
        />
        <ProductDetailInfo product={this.state.product} />
      </div>
    );
  }
}

export default ProductDetail;
