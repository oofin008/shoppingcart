import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { DataError, Either, EitherAsync } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class RemoveItemFromCartUseCase {
  @inject(TYPES.CartRepository) private cartRepository: CartRepository;

  // constructor(cartRepository: CartRepository) {
  //   this.cartRepository = cartRepository;
  // }

  async execute(cartId:string, itemId: string): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(this.cartRepository.getById(cartId));

    return cartResult
      .flatMap(async (cart) => {
        cart.removeItem(itemId);

        const saveResult = await this.cartRepository.update(cart);

        return saveResult.map(() => cart);
      })
      .run();
  }
}
