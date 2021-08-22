import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { ItemRepository } from "../itemRepository";
import { MemoryData } from "../../../shared/data/memoryData";
import { Either, DataError } from "../../../shared/domain";

export class ItemMemoryRepositoryImpl implements ItemRepository {
  constructor(private _database: MemoryData) {}

  public async findAll(): Promise<Either<DataError, Item[]>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const items = await (<Promise<ItemProps[]>>(
            this._database.items.findAll()
          ));
          resolve(Either.right(items.map((item) => Item.create(item))));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  public async getById(id: string): Promise<Either<DataError, Item>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const item = await this._database.items.getById<ItemProps>(id);
          if (!item) {
            throw new Error(`Item with id ${id} not found`);
          }
          resolve(Either.right(Item.create(item)));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 0);
    });
  }

  public async insert(item: Item): Promise<Either<DataError, Item>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const dtoItem = item.unmarshal();
          const isExist = await this._database.items.getById<ItemProps>(
            item.id
          );
          if (isExist) {
            throw new Error(`Item with id ${item.id} already exist`);
          }
          const inserted = await this._database.items.insert(dtoItem);
          resolve(Either.right(Item.create(inserted)));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 0);
    });
  }

  public async update(item: Item): Promise<Either<DataError, Item>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const dtoItem = item.unmarshal();
          const updated = await this._database.items.update<ItemProps>(
            item.id,
            dtoItem
          );
          resolve(Either.right(Item.create(updated)));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 0);
    });
  }
}
