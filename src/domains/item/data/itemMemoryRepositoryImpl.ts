import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { ItemRepository } from "../itemRepository";
import { MemoryData } from "../../../shared/data/memoryData";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class ItemMemoryRepositoryImpl implements ItemRepository {
  @inject(TYPES.Database) private _database: MemoryData;

  public async findAll(): Promise<Item[]> {
    const items = await (<Promise<ItemProps[]>>(
      this._database.items.findAll()
    ));
    return items.map(item => Item.create(item));
  }

  public async getById(id: string): Promise<Item> {
    const item = await this._database.items.getById<ItemProps>(id)
    if(!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    return Item.create(item);
  }

  public async insert(item: Item): Promise<Item> {
    const dtoItem = item.unmarshal();
    const isExist = await this._database.items.getById<ItemProps>(item.id);
    if(isExist) {
      throw new Error(`Item with id ${item.id} already exist`);
    }
    const inserted = await this._database.items.insert(dtoItem);
    return Item.create(inserted);
  }

  public async update(item: Item): Promise<Item> {
    const dtoItem = item.unmarshal();
    const updated = await this._database.items.update<ItemProps>(item.id,dtoItem);
    return Item.create(updated);
  }
  
}
