import React from "react";
import { CartPloc, ItemPloc } from "../presenters";
import { dependenciesLocator } from '../shared/dependency/dependencyLocator'
import { createContext } from "../shared/presentation/context";
import ProductList from "./components/productList";
import CartList from "./components/cartList";

const [blocContext, usePloc] = createContext<CartPloc>();

export const useCartPloc = usePloc;

const App: React.FC = () => {
  return (
    <blocContext.Provider value={dependenciesLocator.provideCartPloc()}>
      <ProductList />
      <CartList />
    </blocContext.Provider>
  );
};

export default App;
