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
    try {
      const dtoCart = cart.unmarshal();
      const inserted = await this._database.cart.insert<CartProps>(dtoCart);
      return Either.right(Cart.create(inserted));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }

  async getById(cartId: string): Promise<Either<DataError, Cart>> {
    try {
      const cart = await this._database.cart.getById<CartProps>(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      return Either.right(Cart.create(cart));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }

  async update(cart: Cart): Promise<Either<DataError, Cart>> {
    try {
      const dtoCart = cart.unmarshal();
      const updated = await this._database.cart.update<CartProps>(
        cart.id,
        dtoCart
      );
      return Either.right(Cart.create(updated));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }
}
