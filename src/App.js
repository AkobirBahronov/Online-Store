import React, { Component } from "react";
import Header from "./components/layout/Header";
import Routes from "./Routes/Routes";
import MiniCart from "./components/Cart/MiniCart";
import { fetchingData } from "./store/Helpers";
import Error from "./components/UI/Error";
import LoadingSpinner from "./components/UI/LoadingSpinner";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showMiniCart: false,
      categoryList: [],
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const query = `
    query GetCategoryList {
      categories {
        name
      }
    }
  `;
    const { data, error } = await fetchingData(query);
    if (!error) {
      this.setState({ categoryList: data.categories });
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
    }
    return (
      <div className="App">
        <Header
          categoryList={this.state.categoryList}
          onShowCart={() => this.setState({ showMiniCart: true })}
        ></Header>
        <main>
          {this.state.showMiniCart && (
            <MiniCart
              onCloseMiniCart={() => this.setState({ showMiniCart: false })}
            />
          )}
          <Routes categoryList={this.state.categoryList} />
        </main>
      </div>
    );
  }
}

export default App;
