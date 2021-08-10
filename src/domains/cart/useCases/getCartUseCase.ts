import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { DataError, Either } from "../../../shared/domain";

export class GetCartUseCase {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    execute(cartId: string): Promise<Either<DataError, Cart>> {
        return this.cartRepository.getById(cartId);
    }
}
