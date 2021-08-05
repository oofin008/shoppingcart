import { inject, injectable } from 'inversify'
import { TYPES } from '../../types';
import { Cart } from './cartEntity';
import { CartRepository } from './cartRepository';

@injectable()
export class CartRepositoryImpl implements CartRepository {
  @inject(TYPES.CartRepository) private _repository: CartRepository;

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
