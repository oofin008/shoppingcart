import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { DataError, Either } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetCartUseCase {
    @inject(TYPES.CartRepository) private cartRepository: CartRepository;

    execute(cartId: string): Promise<Cart> {
      return this.cartRepository.getById(cartId);
    }
}
