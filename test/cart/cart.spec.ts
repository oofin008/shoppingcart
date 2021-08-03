import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import _ from 'lodash';
import { Cart } from '../../src/domains/cart/cartEntity';
import { Item } from '../../src/domains/item/itemEntity';

describe('Cart Entity', () => {

  it('should able to create Cart', () => {
    const cart = Cart.create({id: faker.datatype.uuid(), rawProducts:[]});
    expect(cart.id).to.be.an('string');
  });

  it('should able to add item to Cart', () => {
    // Arrange
    const item = Item.create({id: faker.datatype.uuid(), displayName: faker.name.findName()});
    const cart = Cart.create({id: faker.datatype.uuid(), rawProducts:[]});
    const mockItem = { item:item, quantity:10 };
    
    // Act
    cart.add(item, 10);

    // Assert
    expect(_.some(cart.products, mockItem)).to.be.true;
  });

  it('should able to remove item from Cart', () => {

  });

  it('should able to clear item in Cart', () => {

  });
});
