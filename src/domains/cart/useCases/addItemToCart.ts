import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { Cart } from '../cartEntity';
import { Item } from '../../item/itemEntity';
import { CartRepository } from '../cartRepository';
export interface IAddItemToCartUseCase {
  execute(cartId: string, item: Item, quantity: number): Promise<Cart>;
}

@injectable()
export class AddItemToCartUseCase implements IAddItemToCartUseCase {
  @inject(TYPES.CartRepository) private repository: CartRepository

  private async _getCart(id: string): Promise<Cart> {
    try {
      const cart = await this.repository.getById(id)
      return cart
    } catch (e) {
      const emptyCart = Cart.create({ id })
      return this.repository.create(emptyCart)
    }
  }

  public async execute(cartId: string, item: Item, quantity: number): Promise<Cart> {
    const cart = await this._getCart(cartId)
    cart.add(item, quantity);
    return this.repository.update(cart)
  }
}
