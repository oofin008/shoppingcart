import { Cart } from './cartEntity';
import { CartProps } from './cartInterface';
import { Either, DataError } from '../../shared/domain';

export interface CartRepository {
  create(cart: Cart): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  getById(id: string): Promise<Cart>;
}
