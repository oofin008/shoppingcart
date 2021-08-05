import { Cart } from './cartEntity';

export interface CartRepository {
  create(cart: Cart): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  getById(id: string): Promise<Cart>;
}
