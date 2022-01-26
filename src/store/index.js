import { createStore } from "redux";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : { cart: [], selectedCurrencyId: 0 };

const cartReducer = (state = persistedState, action) => {
  if (action.type === "addToCart") {
    const increasingProduct = state.cart.find(
      (product) => product.id === action.payload.id
    );
    if (increasingProduct) {
      const newCart = [...state.cart];
      newCart[newCart.indexOf(increasingProduct)].number++;
      return {
        ...state,
        cart: newCart,
      };
    } else {
      const product = { ...action.payload, number: 1 };
      return {
        ...state,
        cart: [...state.cart, product],
      };
    }
  }
  if (action.type === "removeFromCart") {
    const reducingProduct = state.cart.find(
      (product) => product.id === action.payload.id
    );
    if (reducingProduct.number > 1) {
      const newCart = [...state.cart];
      newCart[newCart.indexOf(reducingProduct)].number--;
      return {
        ...state,
        cart: newCart,
      };
    } else if (reducingProduct.number === 1) {
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== reducingProduct.id),
      };
    }
  }

  if (action.type === "changeCurrencyType") {
    return {
      ...state,
      selectedCurrencyId: action.payload,
    };
  }

  return state;
};

const store = createStore(cartReducer);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
