import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { Either, EitherAsync, DataError } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

export class RemoveItemFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  public async execute(
    id: string,
    itemId: string
  ): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(this.cartRepository.getById(id));

    return cartResult
      .flatMap(async (cart) => {
        cart.removeItem(itemId);
        return this.cartRepository.update(cart);
      })
      .run();
  }
}
