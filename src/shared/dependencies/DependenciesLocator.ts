// import { MemoryData } from "../data/memoryData";
// import { CartMemoryRepositoryImpl } from "../../domains/cart/data/cartMemoryRepositoryImpl";
// import { GetCartUseCase } from "../../domains/cart/useCases/getCartUseCase";
// import { AddItemToCartUseCase } from "../../domains/cart/useCases/addItemToCartUseCase";
// import { RemoveItemFromCartUseCase } from "../../domains/cart/useCases/removeItemFromCartUseCase";
// import { EditCartItemUseCase } from "../../domains/cart/useCases/editCartItemUseCase";
// import { ItemMemoryRepositoryImpl } from "../../domains/item/data/itemMemoryRepositoryImpl";
// import { GetItemsUseCase } from "../../domains/item/useCases/getItemsUseCase"
// import { ItemPloc } from "../../domains/item/presentation/itemPloc";
// import { CartPloc } from "../../domains/cart/presentation/cartPloc";
// import cuid from "cuid";

// const database = new MemoryData();

// function provideProductsPloc(): ItemPloc {
//   const productRepository = new ItemMemoryRepositoryImpl(database);
//   const getProductsUseCase = new GetItemsUseCase(productRepository);
//   const productsPloc = new ItemPloc(getProductsUseCase);

//   return productsPloc;
// }

// function provideCartPloc(): CartPloc {
//   const cartRepository = new CartMemoryRepositoryImpl(database);
//   const getCartUseCase = new GetCartUseCase(cartRepository);
//   const addProductToCartUseCase = new AddItemToCartUseCase(cartRepository);
//   const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(
//     cartRepository
//   );
//   const editQuantityOfCartItemUseCase = new EditCartItemUseCase(
//     cartRepository
//   );
//   const cartPloc = new CartPloc(
//     cuid(),
//     getCartUseCase,
//     addProductToCartUseCase,
//     removeItemFromCartUseCase,
//     editQuantityOfCartItemUseCase
//   );

//   return cartPloc;
// }

// export const dependenciesLocator = {
//   provideProductsPloc,
//   provideCartPloc,
// };
