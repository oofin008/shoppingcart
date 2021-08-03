import { Item } from './itemEntity';

export interface ItemRepository {
  getAll(): Promise<Item[]>
  getById(id: string): Promise<Item>
  create(item: Item): Promise<Item>
}
