import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { ItemRepository } from "../../item";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class EditCartItemUseCase {

  constructor(
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository,
    @inject(TYPES.CartRepository) private cartRepository: CartRepository
  ) {}

  private async _getCart(id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.getById(id);
      return cart;
    } catch (error) {
      const emptyCart = Cart.create({ id, items: [] });
      return this.cartRepository.create(emptyCart);
    }
  }

  async execute(
    cartId: string,
    itemId: string,
    quantity: number
  ): Promise<Cart> {
    const cart = await this._getCart(cartId);
    const item = await this.itemRepository.getById(itemId);
    const itemInCart = cart.items.find((i) => i.id === itemId);
    const returnQty = itemInCart.quantity - quantity;
    item.updateQuantity(item.quantity + returnQty);
    cart.editItem(itemId, quantity);
    await this.itemRepository.update(item);
    return this.cartRepository.update(cart);
  }
}
