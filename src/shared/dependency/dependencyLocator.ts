import { CartMemoryRepositoryImpl } from "../../domains/cart/data";
import {
  AddItemToCartUseCase,
  EditCartItemUseCase,
  GetCartUseCase,
  RemoveItemFromCartUseCase,
  CreateCartUseCase,
} from "../../domains/cart/useCases";
import { CartPloc, ItemPloc } from "../../presenters";
import { ItemMemoryRepositoryImpl } from "../../domains/item/data";
import {
  GetItemsUseCase,
  AddItemToStockUseCase,
} from "../../domains/item/useCases";
import { MemoryData } from "../data/memoryData";

const database = new MemoryData();

function provideItemPloc(): ItemPloc {
  const itemRepository = new ItemMemoryRepositoryImpl(database);
  const getItemUseCase = new GetItemsUseCase(itemRepository);
  const addItemToStockUseCase = new AddItemToStockUseCase(itemRepository);
  const itemPloc = new ItemPloc(getItemUseCase, addItemToStockUseCase);

  return itemPloc;
}

function provideCartPloc(): CartPloc {
  const cartRepository = new CartMemoryRepositoryImpl(database);
  const getCartUseCase = new GetCartUseCase(cartRepository);
  const addItemToCartUseCase = new AddItemToCartUseCase(cartRepository);
  const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(cartRepository);
  const editCartItemUseCase = new EditCartItemUseCase(cartRepository);
  const createCartUseCase = new CreateCartUseCase(cartRepository);
  const cartPloc = new CartPloc(
    getCartUseCase,
    addItemToCartUseCase,
    removeItemFromCartUseCase,
    editCartItemUseCase,
    createCartUseCase
  );

  return cartPloc;
}

export const dependenciesLocator = {
  provideItemPloc,
  provideCartPloc,
};
