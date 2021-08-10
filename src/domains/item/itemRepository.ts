import { ItemProps } from './itemInterface';
import { Item } from './itemEntity';
import { Either, DataError } from '../../shared/domain';

export interface ItemRepository {
  getAll(): Promise<Either<DataError,Item[]>>;
  getById(id: string): Promise<Either<DataError,Item>>;
  create(item: ItemProps): Promise<Either<DataError,Item>>;
  update(item: Item): Promise<Either<DataError, Item>>;
}
