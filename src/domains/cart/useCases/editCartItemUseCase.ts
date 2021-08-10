import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { EitherAsync, DataError, Either } from "../../../shared/domain";


export class EditCartItemUseCase {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async execute(cartId: string,itemId: string, quantity: number): Promise<Either<DataError, Cart>> {
        const cartResult = EitherAsync.fromPromise(this.cartRepository.getById(cartId));

        return cartResult
            .flatMap(async cart => {
                cart.editItem(itemId, quantity);

                const saveResult = await this.cartRepository.update(cart);

                return saveResult.map(() => cart);
            })
            .run();
    }
}
