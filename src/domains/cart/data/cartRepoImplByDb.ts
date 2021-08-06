import { DataError, Either } from "../../../shared";
import { Cart } from "../cartEntity";
import { CartProps } from '../cartInterface';
import { CartRepository } from "../cartRepository";

export class CartRepoImplByDb implements CartRepository {
    public cart = Cart.create({} as CartProps);

    public getById(): Promise<Either<DataError, Cart>> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                try {
                    resolve(Either.right(this.cart));
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
                    this.cart = cart;
                    resolve(Either.right(cart));
                } catch (error) {
                    resolve(Either.left({ kind: "UnexpectedError", error }));
                }
            }, 100);
        });
    }

}
