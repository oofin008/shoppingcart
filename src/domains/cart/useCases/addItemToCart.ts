import { Either, EitherAsync, DataError } from '../../../shared';
import { Cart } from '../cartEntity';
import { Item } from '../../item/itemEntity';
import { CartRepository } from '../cartRepository';
export interface IAddItemToCartUseCase {
  execute(cartId: string, item: Item, quantity: number): Promise<Either<DataError,Cart>>;
}

export class AddItemToCartUseCase implements IAddItemToCartUseCase {
  private repository: CartRepository

  constructor(repository: CartRepository) {
    this.repository = repository
  }

  public async execute(cartId: string, item: Item, quantity: number): Promise<Either<DataError,Cart>> {
    const cartResult = EitherAsync.fromPromise(this.repository.getById(cartId));
    return cartResult.flatMap(async (cart: Cart) => {
      cart.add(item, quantity);
      return await this.repository.update(cart)
    }).run();
  }
}
