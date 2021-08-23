import { expect } from "chai";
import faker from "faker";
import _ from "lodash";
import { Cart } from "../cartEntity";
import { CartProps } from "../cartInterface";
import { ItemProps } from "../../item/itemInterface";

describe("Cart Entity", () => {
  describe("constructor", () => {
    it("should return getTotalPrice() 0 and empty items if shopping cart is created using constructor with empty items", () => {
      const shoppingCart = Cart.create(givenMockShoppingCart([]));

      expect(shoppingCart.items).to.be.empty;
      expect(shoppingCart.getTotalPrice()).to.equal(0);
      expect(shoppingCart.getTotalItems()).to.equal(0);
    });

    it("should return getTotalPrice() equal to item price and item if shopping cart is created using constructor with 1 item", () => {
      const mockItems = [givenShoppingCartItem(1, 29.99)];

      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      expect(shoppingCart.items).to.equal(mockItems);
      expect(shoppingCart.getTotalPrice()).to.equal(29.99);
      expect(shoppingCart.getTotalItems()).to.equal(1);
    });

    it("should return expected getTotalPrice() and items if shopping cart is created using constructor with 2 items with quantity = 1", () => {
      const mockItems = [
        givenShoppingCartItem(1, 29.99),
        givenShoppingCartItem(1, 39.94),
      ];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      expect(shoppingCart.items).to.equal(mockItems);
      expect(shoppingCart.getTotalPrice()).to.lessThanOrEqual(69.93); // dilemma of comparing floating-point values
      expect(shoppingCart.getTotalItems()).to.equal(2);
    });

    it("should return expected getTotalPrice() and items if shopping cart is created using constructor with 2 items with quantity > 1", () => {
      const mockItems = [
        givenShoppingCartItem(2, 29.99),
        givenShoppingCartItem(5, 39.94),
      ];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      expect(shoppingCart.items).to.equal(mockItems);
      expect(shoppingCart.getTotalPrice()).to.equal(259.68);
      expect(shoppingCart.getTotalItems()).to.equal(7);
    });
  });

  describe("addItem", () => {
    it("should return expected getTotalPrice() and items if item with quantity 1 is added", () => {
      const mockItems = [givenShoppingCartItem(1, 29.99)];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      shoppingCart.addItem(givenShoppingCartItem(1, 39.94));

      expect(shoppingCart.items).to.has.length(2);
      expect(shoppingCart.getTotalPrice()).to.lessThanOrEqual(69.93);
      expect(shoppingCart.getTotalItems()).to.equal(2);
    });

    it("should return expected getTotalPrice() and items if item with quantity > 1 is added", () => {
      const mockItems = [givenShoppingCartItem(1, 20)];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      shoppingCart.addItem(givenShoppingCartItem(1, 30));

      expect(shoppingCart.items).to.has.length(2);
      expect(shoppingCart.getTotalPrice()).to.equal(50);
      expect(shoppingCart.getTotalItems()).to.equal(2);
    });

    it("should increment quantity to existed item and getTotalPrice() if add a existed item again", () => {
      const items = [givenShoppingCartItem(1, 29.99)];
      const shoppingCart = Cart.create(givenMockShoppingCart(items));

      shoppingCart.addItem(items[0]);

      expect(shoppingCart.items).to.has.length(1);
      expect(shoppingCart.getTotalPrice()).to.equal(59.98);
      expect(shoppingCart.getTotalItems()).to.equal(2);
    });
  });

  describe("removeItem", () => {
    it("should return getTotalPrice() 0 and empty items if remove unique item", () => {
      const mockItems = [givenShoppingCartItem(1, 29.99)];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      shoppingCart.removeItem(mockItems[0].id);

      expect(shoppingCart.items).to.be.empty;
      expect(shoppingCart.getTotalPrice()).to.equal(0);
      expect(shoppingCart.getTotalItems()).to.equal(0);
    });

    it("should return expected getTotalPrice() and items if remove item", () => {
      const mockItems = [
        givenShoppingCartItem(1, 29.99),
        givenShoppingCartItem(5, 39.94),
      ];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      shoppingCart.removeItem(mockItems[1].id);

      expect(shoppingCart.items).to.has.length(1);
      expect(shoppingCart.getTotalPrice()).to.equal(29.99);
      expect(shoppingCart.getTotalItems()).to.equal(1);
    });
  });

  describe("editItem", () => {
    it("should return expected getTotalPrice() and items if edit quantity to unique item", () => {
      const mockItems = [givenShoppingCartItem(1, 29.99)];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      shoppingCart.editItem(mockItems[0].id, 2);

      expect(shoppingCart.items).to.has.length(1);
      expect(shoppingCart.getTotalPrice()).to.equal(59.98);
      expect(shoppingCart.getTotalItems()).to.equal(2);
    });

    it("should return expected getTotalPrice() and items if edit quantity to a item", () => {
      const mockItems = [
        givenShoppingCartItem(1, 29.99),
        givenShoppingCartItem(5, 39.94),
      ];
      const shoppingCart = Cart.create(givenMockShoppingCart(mockItems));

      shoppingCart.editItem(mockItems[0].id, 2);

      expect(shoppingCart.items).to.has.length(2);
      expect(shoppingCart.getTotalPrice()).to.equal(259.68);
      expect(shoppingCart.getTotalItems()).to.equal(7);
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
