import { Cart } from "../cartEntity";
import { CartProps } from '../cartInterface';
import { CartRepository } from "../cartRepository";
import { DataError, Either } from "../../../shared/domain";
import { MemoryData } from '../../../shared/data/memoryData';

export class CartMemoryRepositoryImpl implements CartRepository {

  private _database: MemoryData;

  constructor(memoryData: MemoryData) {
    this._database = memoryData;
  }

  create(cart: CartProps): Promise<Either<DataError, Cart>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const inserted = await this._database.cart.insert<CartProps>(cart);
          const cartObject = Cart.create(inserted);
          resolve(Either.right(cartObject));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  getById(cartId: string): Promise<Either<DataError, Cart>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const cartInMemory = await this._database.cart.getById<CartProps>(cartId);
          if(!cartInMemory) {
            throw new Error("Cart not found");
          }
          const cartObject = Cart.create(cartInMemory);
          resolve(Either.right(cartObject));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  update(cart: Cart): Promise<Either<DataError, Cart>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const dtoCart = cart.unmarshal();
          const updated = await this._database.cart.update<CartProps>(cart.id, dtoCart);
          const cartObject = Cart.create(updated);
          resolve(Either.right(cartObject));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }
}
