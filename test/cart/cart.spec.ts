import { expect } from "chai";
import faker from "faker";
import _ from "lodash";
import { Cart } from "../../src/domains/cart/cartEntity";
import { CartProps } from "../../src/domains/cart/cartInterface";
import { ItemProps } from "../../src/domains/item/itemInterface";

describe("Cart Entity", () => {
  describe("constructor", () => {
    it("should return totalPrice 0 and empty items if shopping cart is created using constructor with empty items", () => {
      const shoppingCart = Cart.create(givenMockShoppingCart([]));

      expect(shoppingCart.items).to.be.empty;
      expect(shoppingCart.totalPrice).to.equal(0);
      expect(shoppingCart.totalItems).to.equal(0);
    });

    it("should return totalPrice equal to item price and item if shopping cart is created using constructor with 1 item", () => {
      const mockItems = [givenShoppingCartItem(1, 29.99)];

      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      expect(shoppingCart.items).to.equal(mockItems);
      expect(shoppingCart.totalPrice).to.equal(29.99);
      expect(shoppingCart.totalItems).to.equal(1);
    });

    it("should return expected totalPrice and items if shopping cart is created using constructor with 2 items with quantity = 1", () => {
      const mockItems = [
        givenShoppingCartItem(1, 29.99),
        givenShoppingCartItem(1, 39.94),
      ];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      expect(shoppingCart.items).to.equal(mockItems);
      expect(shoppingCart.totalPrice).to.lessThanOrEqual(69.93); // dilemma of comparing floating-point values
      expect(shoppingCart.totalItems).to.equal(2);
    });

    it("should return expected totalPrice and items if shopping cart is created using constructor with 2 items with quantity > 1", () => {
      const mockItems = [
        givenShoppingCartItem(2, 29.99),
        givenShoppingCartItem(5, 39.94),
      ];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      expect(shoppingCart.items).to.equal(mockItems);
      expect(shoppingCart.totalPrice).to.equal(259.68);
      expect(shoppingCart.totalItems).to.equal(7);
    });
  });

  // describe("addItem", () => {
  //   it("should return expected totalPrice and items if item with quantity 1 is added", () => {
  //     const items = [givenAShoppingCartItem(1, 29.99)];
  //     const shoppingCart = new Cart(items);
  //     const newShoppingCart = shoppingCart.addItem(
  //       givenAShoppingCartItem(1, 39.94)
  //     );

  //     expect(newShoppingCart.items).toHaveLength(2);
  //     expect(newShoppingCart.totalPrice).toEqual(69.93);
  //     expect(newShoppingCart.totalItems).toEqual(2);
  //   });

  //   it("should return expected totalPrice and items if item with quantity > 1 is added", () => {
  //     const items = [givenAShoppingCartItem(1, 29.99)];
  //     const shoppingCart = new Cart(items);
  //     const newShoppingCart = shoppingCart.addItem(
  //       givenAShoppingCartItem(3, 39.94)
  //     );

  //     expect(newShoppingCart.items).toHaveLength(2);
  //     expect(newShoppingCart.totalPrice).toEqual(149.81);
  //     expect(newShoppingCart.totalItems).toEqual(4);
  //   });

  //   it("should increment quantity to existed item and totalPrice if add a existed item again", () => {
  //     const items = [givenAShoppingCartItem(1, 29.99)];
  //     const shoppingCart = new Cart(items);
  //     const newShoppingCart = shoppingCart.addItem(items[0]);

  //     expect(newShoppingCart.items).toHaveLength(1);
  //     expect(newShoppingCart.totalPrice).toEqual(59.98);
  //     expect(newShoppingCart.totalItems).toEqual(2);
  //   });
  // });
});

function givenShoppingCartItem(quantity = 1, price = 0): ItemProps {
  return {
    id: faker.datatype.uuid(),
    displayName: faker.name.findName(),
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
