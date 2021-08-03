import { Cart } from './cartEntity';

export interface CartRepository {
  getCartById(id: number): Promise<Cart>;
  create(cart: Cart): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
}
