import React, { Component } from "react";

import vectorOpen from "../../icons/vectorOpen.svg";
import vectorClose from "../../icons/vectorClose.svg";
import { connect } from "react-redux";
import Currencies from "./Currencies";
import { fetchingData } from "../../store/Helpers";
import LoadingSpinner from "../UI/LoadingSpinner";
import Error from "../UI/Error";
import HeaderNavigation from "./HeaderNavigation";

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const query = `
    query getCurrencyTypes {
      currencies {
        label
        symbol
      }
    }
  `;
    const { data, error } = await fetchingData(query);
    if (!error) {
      this.setState({ currencies: data.currencies });
    } else {
      this.setState({ error: error });
    }
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    } else if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <header className={classes.header}>
        <HeaderNavigation categoryList={this.props.categoryList} />
        <div className={classes.actions}>
          <div className={classes.currency}>
            <h3>
              {this.state.currencies[this.props.selectedCurrencyId].symbol}
            </h3>
            <img className={classes["v-open"]} src={vectorOpen} alt="open" />
            <img className={classes["v-close"]} src={vectorClose} alt="close" />
            <div className={classes["currency-types"]}>
              <Currencies
                currencies={this.state.currencies}
                onChangeCurrencyId={(id) => this.props.changeCurrencyId(id)}
              />
            </div>
          </div>
          <HeaderCartButton onShowCart={this.props.onShowCart} />
        </div>
      </header>
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
    changeCurrencyId: (payload) =>
      dispatch({ type: "changeCurrencyType", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
