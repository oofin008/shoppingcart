import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import { CartRepoImplByDb } from '../../src/domains/cart/data/cartRepoImpl';

describe('Cart Repository impl by DB', () => {
  it('should create cart success', async () => {
    const mockCartProps = {
      id: faker.datatype.uuid()
    };

    const cartDb = new CartRepoImplByDb();
    const cartResult = await cartDb.create(mockCartProps);

    expect(cartResult.isRight()).to.be.true;
  });

  it('should create cart fail', async () => {
    const mockCartProps = {
      id: faker.datatype.uuid()
    };

    const cartDb = new CartRepoImplByDb();
    await cartDb.create(mockCartProps);
    const cartResult = await cartDb.create(mockCartProps);

    expect(cartResult.isLeft()).to.be.true;
  });

});
