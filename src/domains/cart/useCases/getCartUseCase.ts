import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetCartUseCase {

    constructor(@inject(TYPES.CartRepository) private cartRepository: CartRepository ) {}

    execute(cartId: string): Promise<Cart> {
      return this.cartRepository.getById(cartId);
    }
}
