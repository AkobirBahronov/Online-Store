import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";

import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import ProductsList from "../pages/ProductsList";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to={"/" + this.props.categoryList[0].name} exact />
        </Route>
        {this.props.categoryList.map((category) => (
          <Route path={"/" + category.name} key={category.name} exact>
            <ProductsList type={category.name} />
          </Route>
        ))}
        {this.props.categoryList.map((category) => (
          <Route
            key={category.name}
            path={"/" + category.name + "/:id"}
            exact
            render={({ match }) => <ProductDetail id={match.params.id} />}
          />
        ))}
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
    );
  }
}

export default Routes;
