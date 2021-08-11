import { ItemProps } from './itemInterface';
import { Item } from './itemEntity';
import { Either, DataError } from '../../shared/domain';

export interface ItemRepository {
  getAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  create(item: ItemProps): Promise<Item>;
  update(item: Item): Promise<Item>;
}
