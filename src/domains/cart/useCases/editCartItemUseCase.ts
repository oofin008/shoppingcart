import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { DataError, Either, EitherAsync } from "../../../shared/domain";

export class EditCartItemUseCase {
  constructor(private cartRepository: CartRepository) {}

  public async execute(
    cartId: string,
    itemId: string,
    quantity: number
  ): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(
      this.cartRepository.getById(cartId)
    );

    return cartResult
      .flatMap(async (cart) => {
        cart.editItem(itemId, quantity);
        return this.cartRepository.update(cart);
      })
      .run();
  }
}
