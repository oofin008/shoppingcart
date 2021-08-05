import { Cart } from './cartEntity';
import { CartRepository } from './cartRepository';

export class CartRepositoryImpl implements CartRepository {
  private _repository: CartRepository;

  public create(cart: Cart): Promise<Cart>{
    return this._repository.create(cart);
  }

  public update(cart: Cart): Promise<Cart>{
    return this._repository.update(cart);
  }

  public getById(id: string): Promise<Cart>{
    return this._repository.getById(id);
  }

}
