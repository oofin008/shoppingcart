import React from "react";
import MyAppBar from "./components/appBar";
import { CartPloc } from "../presenters";
import { dependenciesLocator } from '../shared/dependency/dependencyLocator'
import { createContext } from "../shared/presentation/context";
import ProductList from "./components/productList";
import CartDrawer from "./components/cartDrawer";

const [blocContext, usePloc] = createContext<CartPloc>();

export const useCartPloc = usePloc;

const App: React.FC = () => {
    return (
        <blocContext.Provider value={dependenciesLocator.provideCartPloc()}>
            <MyAppBar />
            {/* <ProductList /> */}
            <CartDrawer />
        </blocContext.Provider>
    );
};

export default App;
