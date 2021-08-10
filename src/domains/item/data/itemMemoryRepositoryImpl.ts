import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { ItemRepository } from "../itemRepository";
import { DataError, Either } from "../../../shared/domain";
import { MemoryData } from "../../../shared/data/memoryData";

export class ItemMemoryRepositoryImpl implements ItemRepository {
  private _database: MemoryData;

  constructor(memoryData: MemoryData) {
    this._database = memoryData;
  }

  public async getAll(): Promise<Either<DataError, Item[]>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const itemInMemory = await (<Promise<ItemProps[]>>(
            this._database.items.findAll()
          ));
          const itemList = itemInMemory.map((item) => Item.create(item));
          resolve(Either.right(itemList));
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
          const itemInMemory = await this._database.items.getById<ItemProps>(id);
          if (!itemInMemory) {
            throw new Error("Item not found");
          }
          const itemObject = Item.create(itemInMemory);
          resolve(Either.right(itemObject));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  public async create(item: ItemProps): Promise<Either<DataError, Item>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const inserted = await this._database.items.insert<ItemProps>(item);
          const itemObject = Item.create(inserted);
          resolve(Either.right(itemObject));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }

  public async update(item: Item): Promise<Either<DataError, Item>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const dtoItemm = item.unmarshal();
          const updated = await this._database.items.update<ItemProps>(item.id, dtoItemm);
          const itemObject = Item.create(updated);
          return Item.create(itemObject);
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error }));
        }
      }, 100);
    });
  }
}
