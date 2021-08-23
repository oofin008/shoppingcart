import { expect } from "chai";
import faker from "faker";
import _ from "lodash";
import { Item } from "../itemEntity";
import { CartProps } from "../../cart/cartInterface";
import { ItemProps } from "../itemInterface";

describe("Item Entity", () => {
  describe('constructor', () => {
    it('should return item with quantity 1 if create with 0 quantity', () => {
      const mockItem = givenShoppingCartItem(0);

      const item = Item.create(mockItem);

      expect(item.quantity).to.equal(1);
    });

    it('should return item with quantity 1 if create with -20 quantity', () => {
      const mockItem = givenShoppingCartItem(-20);

      const item = Item.create(mockItem);

      expect(item.quantity).to.equal(1);
    });
  });

  describe('get item', () => {
    it('should able to get 5 item from stock with quantity 10', () => {
      const mockItem = givenShoppingCartItem(10);
      const item = Item.create(mockItem);

      const isGetSuccess = item.getItem(5);

      expect(isGetSuccess).to.be.true;
      expect(item.quantity).to.equal(5);
    });
    
    it('should unable to get 5 item from stock with quantity 4', () => {
      const mockItem = givenShoppingCartItem(4);
      const item = Item.create(mockItem);

      const isGetSuccess = item.getItem(5);

      expect(isGetSuccess).to.be.false;
      expect(item.quantity).to.equal(4);
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
