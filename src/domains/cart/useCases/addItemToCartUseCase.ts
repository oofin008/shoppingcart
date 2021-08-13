import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { CartId } from "../cartInterface";
import { ItemProps } from "../../item/itemInterface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class AddItemToCartUseCase {
  constructor( @inject(TYPES.CartRepository) private cartRepository: CartRepository) {}

  // bad code, shouldn't use error handling to create cart
  // we don't know if it catch because no cart, or others error
  private async _getCart(id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.getById(id);
      return cart
    } catch (error) {
      const emptyCart = Cart.create({id, items: []});
      return this.cartRepository.create(emptyCart);
    }
  }

  async execute(id: CartId, item: ItemProps): Promise<Cart> {
    const cart = await this._getCart(id);
    cart.addItem(item);
    return this.cartRepository.update(cart);
  }
}
