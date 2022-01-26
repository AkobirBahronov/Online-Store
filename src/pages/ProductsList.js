import React, { Component } from "react";
import classes from "./ProductsList.module.css";
import ProductCard from "../components/products/ProductCard";
import { fetchingData } from "../store/Helpers";
import Error from "../components/UI/Error";
import LoadingSpinner from "../components/UI/LoadingSpinner";

class ProductsPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    await this.fetchingProducts();
  }

  async componentDidUpdate(prevProps, _) {
    if (prevProps.type !== this.props.type) {
      await this.fetchingProducts();
    }
  }

  async fetchingProducts() {
    const query = `
    query getProducts {
      category(input: { title: "${this.props.type}" }) {
        name
        products {
          id
          name
          inStock
          gallery
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
              symbol
            }
            amount
          }
        }
      }
    }
  `;
    this.setState({ isLoading: true });
    const { data, error } = await fetchingData(query);
    if (!error) {
      this.setState({ products: data.category.products });
    } else {
      this.setState({ error });
    }
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    } else if (this.state.error) {
      <Error error={this.state.error} />;
    }
    return (
      <>
        <p className={classes.title}>{this.props.type}</p>
        <div className={classes["card-list"]}>
          {this.state.products.map((product) => (
            <ProductCard product={product} key={product.id}></ProductCard>
          ))}
        </div>
      </>
    );
  }
}

export default ProductsPage;
