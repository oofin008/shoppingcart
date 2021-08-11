import { Item } from './itemEntity';

export interface ItemRepository {
  findAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  insert(item: Item): Promise<Item>;
  update(item: Item): Promise<Item>;
}
