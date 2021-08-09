import { DataError, Either } from "../../../shared";
import { Cart } from "../cartEntity";
import { CartProps } from '../cartInterface';
import { CartRepository } from "../cartRepository";

export class CartRepoImplByDb implements CartRepository {
    private _carts: Cart[] = [];

    public create(cart: CartProps): Promise<Either<DataError, Cart>> {
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          try {
            const index = this._carts.findIndex((c) => c.id === cart.id);
            if(index > -1) {
              throw new Error("Cannot create, cart already exists");
            }
            const newCart = Cart.create(cart);
            this._carts.push(newCart);
            resolve(Either.right(this._carts[this._carts.length - 1]));
          } catch (error) {
            resolve(Either.left({ kind: "UnexpectedError", error }));
          }
        }, 100);
      });
    }

    public getById(id): Promise<Either<DataError, Cart>> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                try {
                    const index = this._carts.findIndex((c) => c.id === id);
                    if(index > -1) {
                      resolve(Either.right(this._carts[index]));
                    }
                    throw Error("Cart not found");
                } catch (error) {
                    resolve(Either.left({ kind: "UnexpectedError", error }));
                }
            }, 100);
        });
    }

    public update(cart: Cart): Promise<Either<DataError, Cart>> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                try {
                  const index = this._carts.findIndex((c) => c.id === cart.id);
                  if(index > -1) {
                    this._carts[index] = cart;
                    resolve(Either.right(cart));
                  }
                  throw Error("Cart not found");
                } catch (error) {
                    resolve(Either.left({ kind: "UnexpectedError", error }));
                }
            }, 100);
        });
    }

}
