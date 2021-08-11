import { injectable, inject } from 'inversify'
import { Cart } from "../cartEntity";
import { CartProps } from '../cartInterface';
import { CartRepository } from "../cartRepository";
import { DataError, Either } from "../../../shared/domain";
import { MemoryData } from '../../../shared/data/memoryData';
import { TYPES } from '../../../types';

@injectable()
export class CartMemoryRepositoryImpl implements CartRepository {

  @inject(TYPES.Database) private _database: MemoryData;

  async create(cart: Cart): Promise<Cart> {
    const dtoCart = cart.unmarshal();
    const inserted = await this._database.cart.insert<CartProps>(dtoCart);
    return Cart.create(inserted);
  }

  async getById(cartId: string): Promise<Cart> {
    const cart = await this._database.cart.getById<CartProps>(cartId);
    if(!cart) {
      throw new Error("Cart not found");
    }
    return Cart.create(cart);
  }

  async update(cart: Cart): Promise<Cart> {
    const dtoCart = cart.unmarshal();
    const updated = await this._database.cart.update<CartProps>(cart.id, dtoCart);
    return Cart.create(updated);
  }
}
