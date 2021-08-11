import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { DataError, Either, EitherAsync } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class RemoveItemFromCartUseCase {
  @inject(TYPES.CartRepository) private cartRepository: CartRepository;

  private async _getCart(id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.getById(id);
      return cart
    } catch (error) {
      const emptyCart = Cart.create({id, items: []});
      return this.cartRepository.create(emptyCart);
    }
  }

  async execute(id:string, itemId: string): Promise<Cart> {
    const cart = await this._getCart(id);
    cart.removeItem(itemId);
    return this.cartRepository.update(cart);
  }
}
