import { Either, EitherAsync, DataError } from '../../../shared';
import { Cart } from '../cartEntity';
import { CartRepository } from '../cartRepository';

export interface IGetCart {
  execute(cartId: string): Promise<Either<DataError,Cart>>;
}

export class GetCartUseCase implements IGetCart {
  private repository: CartRepository;

  constructor(repository: CartRepository) {
    this.repository = repository
  }

  public async execute(cartId: string): Promise<Either<DataError,Cart>> {
    return this.repository.getById(cartId);
  }
}