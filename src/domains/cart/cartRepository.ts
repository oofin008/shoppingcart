import { Cart } from './cartEntity';
import { Either, DataError } from '../../shared';

export interface CartRepository {
  // create(cart: Cart): Promise<Either<DataError,Cart>>;
  update(cart: Cart): Promise<Either<DataError,Cart>>;
  getById(id: string): Promise<Either<DataError,Cart>>;
}
