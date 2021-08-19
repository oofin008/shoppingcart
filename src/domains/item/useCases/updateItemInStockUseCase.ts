import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { DataError, Either } from "../../../shared/domain";

export class UpdateItemInStockUseCase {
  constructor(private itemRepository: ItemRepository) {}

  public execute(item: Item): Promise<Either<DataError, Item>> {
    return this.itemRepository.update(item);
  }
}
