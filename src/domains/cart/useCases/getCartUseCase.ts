import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { DataError, Either } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetCartUseCase {
  constructor(@inject(TYPES.CartRepository) private cartRepository: CartRepository) {}

  public execute(cartId: string): Promise<Either<DataError, Cart>> {
    return this.cartRepository.getById(cartId);
  }
}
