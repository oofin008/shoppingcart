// reduce stock item in this use case instead
// return total price, total quantity???
import { CartRepository } from "../cartRepository";
import { ItemRepository } from "../../item/itemRepository";
import { TYPES } from "../../../types";
import { injectable, inject } from "inversify";

@injectable()
export class PurchaseItemUseCase {
    constructor(
      @inject(TYPES.CartRepository) private cartRepository: CartRepository,
      @inject(TYPES.ItemRepository) private itemRepository: ItemRepository
    ) { }

    public async execute(cartId: string, itemId: number, quantity: number) {
      try {
        const cart = await this.cartRepository.getById(cartId);
      } catch (error) {
        throw error
      }
    }
}
