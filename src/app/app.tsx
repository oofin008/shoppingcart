import React from "react";
import { CartPloc, ItemPloc } from "../presenters";
import { dependenciesLocator } from '../shared/dependency/dependencyLocator'
import { createContext } from "../shared/presentation/context";
import ProductList from "./components/productList";
import CartContent from "./components/CartContent";
import CartDrawer from "./components/cartDrawer";
import MyAppBar from "./components/appBar";

const [blocContext, usePloc] = createContext<CartPloc>();

export const useCartPloc = usePloc;

const App: React.FC = () => {
  return (
    <blocContext.Provider value={dependenciesLocator.provideCartPloc()}>
      <ProductList />
      <CartContent />
    </blocContext.Provider>
  );
};

export default App;
