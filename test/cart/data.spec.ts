import { expect } from "chai";
import faker from "faker";
import _ from "lodash";
import { EitherAsync, DataError } from '../../src/shared/domain';
import { Cart } from "../../src/domains/cart/cartEntity";
import { CartProps } from "../../src/domains/cart/cartInterface";
import { ItemProps } from "../../src/domains/item/itemInterface";
import { MemoryData } from '../../src/shared/data/memoryData';
import { CartMemoryRepositoryImpl } from '../../src/domains/cart/data/cartMemoryRepositoryImpl';
import { AddItemToCartUseCase } from '../../src/domains/cart/useCases/addItemToCartUseCase';


describe("Cart Data", () => {
  describe("create new cart", () => {
    it("should able to get 1 cart if create 1", async () => {
      const database = new MemoryData();
      const repo = new CartMemoryRepositoryImpl(database);
      const useCase = new AddItemToCartUseCase(repo);
      const mockItems = givenShoppingCartItem();
      const mockCart = givenMockShoppingCart([]);
      let cartObj: Cart;
      const cartResult = await repo.create(mockCart);

      cartResult.fold(
        error => console.log(error),
        cart => { cartObj = cart; },
      );

      const addResult = await useCase.execute(cartObj.id, mockItems);

      addResult.fold(
        error => console.log(error),
        cart => { cartObj = cart; },
      );

      expect(cartObj.id).to.equal(mockCart.id);
      expect(cartObj.items).to.has.length(1);
    });
  });
});

function givenShoppingCartItem(quantity = 1, price = 0): ItemProps {
  return {
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    price: price,
    quantity: quantity,
  };
}

function givenMockShoppingCart(items: ItemProps[]): CartProps {
  return {
    id: faker.datatype.uuid(),
    items,
  };
}
