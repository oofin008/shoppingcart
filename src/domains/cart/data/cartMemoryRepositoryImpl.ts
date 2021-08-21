import { injectable, inject } from "inversify";
import { Cart } from "../cartEntity";
import { CartProps } from "../cartInterface";
import { CartRepository } from "../cartRepository";
import { MemoryData } from "../../../shared/data/memoryData";
import { Either, DataError } from "../../../shared/domain";
import { TYPES } from "../../../types";

// this class should expose at infra layer
export class CartMemoryRepositoryImpl implements CartRepository {
  constructor(private _database: MemoryData) {}

  async create(cart: Cart): Promise<Either<DataError, Cart>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const dtoCart = cart.unmarshal();
          const inserted = await this._database.cart.insert<CartProps>(dtoCart);
          resolve(Either.right(Cart.create(inserted)));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  async getById(cartId: string): Promise<Either<DataError, Cart>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const cart = await this._database.cart.getById<CartProps>(cartId);
          if (!cart) {
            // throw new Error("Cart not found");
            console.log("create new cart");
            const newCart = await this._database.cart.insert<CartProps>({
              id: cartId,
              items: [
                { id: "0001", title: "product1", price: 10, quantity: 1 },
                { id: "0002", title: "product2", price: 20, quantity: 2 },
              ],
            });
            resolve(Either.right(Cart.create(newCart)));
          }
          resolve(Either.right(Cart.create(cart)));
          // return Either.right(this.cart);
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  async update(cart: Cart): Promise<Either<DataError, Cart>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const dtoCart = cart.unmarshal();
          const updated = await this._database.cart.update<CartProps>(
            cart.id,
            dtoCart
          );
          resolve(Either.right(Cart.create(updated)));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }
}
