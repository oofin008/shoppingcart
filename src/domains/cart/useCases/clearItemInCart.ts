import { Cart } from '../cartEntity';
import { CartRepository } from '../cartRepository';

export interface IClearItemInCart {
  execute(cartId: string): Promise<Cart>;
}

export class AddItemToCartUseCase implements IClearItemInCart {
  private repository: CartRepository

  public async execute(cartId: string): Promise<Cart> {
    const cart = await this.repository.getById(cartId);
    cart.empty();
    return this.repository.update(cart)
  }
}