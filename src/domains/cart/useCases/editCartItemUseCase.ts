import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { EitherAsync, DataError, Either } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class EditCartItemUseCase {
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

    async execute(cartId: string,itemId: string, quantity: number): Promise<Cart> {
      const cart = await this._getCart(cartId);
      cart.editItem(itemId, quantity);
      return this.cartRepository.update(cart);
    }
}
