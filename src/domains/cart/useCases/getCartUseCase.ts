import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { DataError, Either } from "../../../shared/domain";

export class GetCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  public execute(cartId: string): Promise<Either<DataError, Cart>> {
    return this.cartRepository.getById(cartId);
  }
}
