import React, { Component } from "react";

import vOpen from "../../icons/vectorOpen.svg";
import vClose from "../../icons/vectorClose.svg";
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
      closeCurrencySelection: false,
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

  changeCurrencyIdHandler(id) {
    this.props.changeCurrencyId(id);
    this.setState({ closeCurrencySelection: true });
  }

  openCurrencySelectionHandler() {
    this.setState({ closeCurrencySelection: false });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    } else if (this.state.error) {
      return <Error error={this.state.error} />;
    }

    const currencyClassName = `${classes.currency} ${
      this.state.closeCurrencySelection ? classes.disappear : ""
    }`;

    return (
      <header className={classes.header}>
        <HeaderNavigation categoryList={this.props.categoryList} />
        <div className={classes.actions}>
          <div className={currencyClassName}>
            <div onMouseEnter={this.openCurrencySelectionHandler.bind(this)}>
              <h3>
                {this.state.currencies[this.props.selectedCurrencyId].symbol}
              </h3>
              <img className={classes["v-open"]} src={vOpen} alt="open" />
              <img className={classes["v-close"]} src={vClose} alt="close" />
            </div>
            <div className={classes["currency-types"]}>
              <Currencies
                currencies={this.state.currencies}
                onChangeCurrencyId={this.changeCurrencyIdHandler.bind(this)}
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
