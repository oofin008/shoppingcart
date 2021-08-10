import { MemoryData } from "../data/memoryData";
import { CartMemoryRepositoryImpl } from "../../domains/cart/data/cartMemoryRepositoryImpl";
import { GetCartUseCase } from "../../domains/cart/useCases/getCartUseCase";
import { AddItemToCartUseCase } from "../../domains/cart/useCases/addItemToCartUseCase";
import { RemoveItemFromCartUseCase } from "../../domains/cart/useCases/removeItemFromCartUseCase";
import { EditCartItemUseCase } from "../../domains/cart/useCases/editCartItemUseCase";
import { CartPloc } from "../../domains/cart/presentation/CartPloc";
import cuid from "cuid";

// function provideProductsPloc(): ProductsPloc {
//   const productRepository = new ProductInMemoryRepository();
//   const getProductsUseCase = new GetProductsUseCase(productRepository);
//   const productsPloc = new ProductsPloc(getProductsUseCase);

//   return productsPloc;
// }

function provideCartPloc(): CartPloc {
  const database = new MemoryData();
  const cartRepository = new CartMemoryRepositoryImpl(database);
  const getCartUseCase = new GetCartUseCase(cartRepository);
  const addProductToCartUseCase = new AddItemToCartUseCase(cartRepository);
  const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(
    cartRepository
  );
  const editQuantityOfCartItemUseCase = new EditCartItemUseCase(
    cartRepository
  );
  const cartPloc = new CartPloc(
    cuid(),
    getCartUseCase,
    addProductToCartUseCase,
    removeItemFromCartUseCase,
    editQuantityOfCartItemUseCase
  );

  return cartPloc;
}

export const dependenciesLocator = {
  // provideProductsPloc,
  provideCartPloc,
};
