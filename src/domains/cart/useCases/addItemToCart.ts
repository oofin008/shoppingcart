import { Cart } from '../cartEntity';
import { Item } from '../../item/itemEntity';
import { CartRepository } from '../cartRepository';
export interface IAddItemToCartUseCase {
  execute(cartId: string, item: Item, quantity: number): Promise<Cart>;
}

export class AddItemToCartUseCase implements IAddItemToCartUseCase {
  private repository: CartRepository

  constructor(repository: CartRepository) {
    this.repository = repository
  }

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
