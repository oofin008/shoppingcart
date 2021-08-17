import { CartRepository } from "../cartRepository";
import { Cart } from "../cartEntity";
import { CartId, CartProps } from "../cartInterface";
import { ItemProps } from "../../item/itemInterface";
import { Either, EitherAsync, DataError } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class CreateCartUseCase {
  constructor(
    @inject(TYPES.CartRepository) private cartRepository: CartRepository
  ) {}

  public async execute(id: CartId, items: ItemProps[]): Promise<Either<DataError,Cart>> {
    const cartResult = await this.cartRepository.getById(id);
    if(cartResult.isRight()){
      throw new Error(`Cart ${id} already exists`);
    }
    const cart = Cart.create({id, items} as CartProps);
    return this.cartRepository.create(cart);
  }
}
