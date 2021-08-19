import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { CartId } from "../cartInterface";
import { ItemProps } from "../../item/itemInterface";
import { Either, EitherAsync, DataError } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

export class AddItemToCartUseCase {
  constructor(
    private cartRepository: CartRepository
  ) {}

  public async execute(
    id: CartId,
    item: ItemProps
  ): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(this.cartRepository.getById(id));
    return cartResult
      .flatMap<Cart>((cart) => {
        cart.addItem(item);
        return this.cartRepository.update(cart);
      })
      .run();
  }
}
