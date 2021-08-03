import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import { Cart } from '../../src/domains/cart/cartEntity';
import { UnmarshalledItem } from '../../src/domains/item/itemEntity';

describe('Cart Entity', () => {

  it('should able to create Cart', () => {
    const cart = Cart.create({id: faker.datatype.uuid(), rawProducts:[]});
    expect(cart.id).to.be.an('string');
  });

  it('should able to add item to Cart', () => {
    // Arrange
    const item: UnmarshalledItem = {
      id: faker.datatype.uuid(),
      displayName: faker.name.findName(),
      price: faker.datatype.number(),
    }
    const cart = Cart.create({id: faker.datatype.uuid(), rawProducts:[]});
    const mockItem = { item:item, quantity:10 };
    
    // Act
    cart.add(item, 10);

    // Assert
    expect(_.some(cart.products, mockItem)).to.be.true;
  });

  it('should able to remove item from Cart', () => {
    // Arrange
    const mockItemId = faker.datatype.uuid();
    const item1: UnmarshalledItem = {
      id: mockItemId,
      displayName: faker.name.findName(),
      price: faker.datatype.number(),
    }
    const item2: UnmarshalledItem = {
      id: faker.datatype.uuid(),
      displayName: faker.name.findName(),
      price: faker.datatype.number(),
    }
    const cart = Cart.create({id: faker.datatype.uuid(), rawProducts:[]});
    const mockItem1 = { item:item1, quantity:10 };
    const mockItem2 = { item:item2, quantity:10 };
    cart.add(item1, 10);
    cart.add(item2, 10);

    // Act
    cart.remove(mockItemId);

    // Assert
    expect(_.some(cart.products, mockItem1)).to.be.false;
    expect(_.some(cart.products, mockItem2)).to.be.true;
  });

  it('should able to clear item in Cart', () => {
    // Arrange
    const item1: UnmarshalledItem = {
      id: faker.datatype.uuid(),
      displayName: faker.name.findName(),
      price: faker.datatype.number(),
    }
    const item2: UnmarshalledItem = {
      id: faker.datatype.uuid(),
      displayName: faker.name.findName(),
      price: faker.datatype.number(),
    }
    const cart = Cart.create({id: faker.datatype.uuid(), rawProducts:[]});
    cart.add(item1, faker.datatype.number(500));
    cart.add(item2, faker.datatype.number(500));

    // Act
    cart.empty();

    // Assert
    expect(cart.products.length).to.equal(0);
  });
});
