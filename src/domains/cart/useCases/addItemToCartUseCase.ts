import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { CartId, CartProps } from "../cartInterface";
import { ItemProps } from "../../item/itemInterface";
import { Either, DataError, EitherAsync } from "../../../shared/domain";

export class AddItemToCartUseCase {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(cartId: CartId, item: ItemProps): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(
      this.cartRepository.getById(cartId)
    );

    return cartResult
      .flatMap(async (cart) => {
        const cartItem:ItemProps = {
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: 1,
        };

        cart.addItem(cartItem);

        const saveResult = await this.cartRepository.update(cart);

        return saveResult.map(() => cart);
      })
      .run();
  }
}
