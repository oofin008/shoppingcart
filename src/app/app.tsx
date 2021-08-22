import React from "react";
import { CartPloc, ItemPloc } from "../presenters";
import { dependenciesLocator } from '../shared/dependency/dependencyLocator'
import { createContext } from "../shared/presentation/context";
import ItemList from "./components/item/itemList";
import CartList from "./components/cart/cartList";

const [blocContext, usePloc] = createContext<CartPloc>();

export const useCartPloc = usePloc;

const App: React.FC = () => {
  return (
    <blocContext.Provider value={dependenciesLocator.provideCartPloc()}>
      <ItemList />
      <CartList />
    </blocContext.Provider>
  );
};

export default App;
