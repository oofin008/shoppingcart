import { Either, EitherAsync, DataError } from '../../../shared';
import { Cart } from '../cartEntity';
import { CartRepository } from '../cartRepository';

export interface IClearItemInCart {
  execute(cartId: string): Promise<Either<DataError,Cart>>;
}

export class ClearItemInCartUseCase implements IClearItemInCart {
  private repository: CartRepository;

  constructor(repository: CartRepository) {
    this.repository = repository
  }

  public async execute(cartId: string): Promise<Either<DataError,Cart>> {
    const cartResult = EitherAsync.fromPromise(this.repository.getById(cartId));

    return cartResult.flatMap( async (cart: Cart) => {
      cart.empty();
      return await this.repository.update(cart);
    }).run();
  }
}