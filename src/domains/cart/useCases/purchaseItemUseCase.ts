// // reduce stock item in this use case instead
// // return total price, total quantity???
// import { Cart } from "../cartEntity";
// import { CartRepository } from "../cartRepository";
// import { ItemRepository } from "../../item/itemRepository";
// import { TYPES } from "../../../types";
// import { injectable, inject } from "inversify";
// import { DataError, Either, EitherAsync } from "../../../shared/domain";

// @injectable()
// export class PurchaseItemUseCase {
//     constructor(
//       @inject(TYPES.CartRepository) private cartRepository: CartRepository,
//       @inject(TYPES.ItemRepository) private itemRepository: ItemRepository
//     ) { }

//     public async execute(cartId: string, itemId: string): Promise<Either<DataError, Cart>> {
//       try {
//         const cart = await this.cartRepository.getById(cartId);
//         const item = cart.getItem(itemId);
//         cart.removeItem(itemId);
//         const itemInStock = await this.itemRepository.getById(itemId);
//         itemInStock.updateQuantity(item.quantity);
//         this.itemRepository.update(itemInStock);
//         return EitherAsync.fromPromise(this.cartRepository.update(cart));
//       } catch (error) {
//         throw error
//       }
//     }
// }
