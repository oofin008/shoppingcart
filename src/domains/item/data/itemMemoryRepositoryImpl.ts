import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { ItemRepository } from "../itemRepository";
import { MemoryData } from "../../../shared/data/memoryData";
import { inject, injectable } from "inversify";
import { Either, DataError } from "../../../shared/domain";
import { TYPES } from "../../../types";

@injectable()
export class ItemMemoryRepositoryImpl implements ItemRepository {
  constructor(@inject(TYPES.Database) private _database: MemoryData) {}

  public async findAll(): Promise<Either<DataError,Item[]>> {
    try {
      const items = await (<Promise<ItemProps[]>>(
        this._database.items.findAll()
      ));
      return Either.right(items.map((item) => Item.create(item)));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }

  public async getById(id: string): Promise<Either<DataError,Item>> {
    try {
      const item = await this._database.items.getById<ItemProps>(id);
      if (!item) {
        throw new Error(`Item with id ${id} not found`);
      }
      return Either.right(Item.create(item));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }

  public async insert(item: Item): Promise<Either<DataError,Item>> {
    try {
      const dtoItem = item.unmarshal();
      const isExist = await this._database.items.getById<ItemProps>(item.id);
      if (isExist) {
        throw new Error(`Item with id ${item.id} already exist`);
      }
      const inserted = await this._database.items.insert(dtoItem);
      return Either.right(Item.create(inserted));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }

  public async update(item: Item): Promise<Either<DataError,Item>> {
    try {
      const dtoItem = item.unmarshal();
      const updated = await this._database.items.update<ItemProps>(
        item.id,
        dtoItem
      );
      return Either.right(Item.create(updated));
    } catch (error) {
      return Either.left({ kind: "UnexpectedError", error });
    }
  }
}
