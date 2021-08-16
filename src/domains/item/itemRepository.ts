import { Item } from './itemEntity';
import { Either, DataError } from '../../shared/domain';

export interface ItemRepository {
  findAll(): Promise<Either<DataError,Item[]>>;
  getById(id: string): Promise<Either<DataError,Item>>;
  insert(item: Item): Promise<Either<DataError,Item>>;
  update(item: Item): Promise<Either<DataError,Item>>;
}
