import { ItemRepository } from "../itemRepository";
import { Item } from "../itemEntity";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { DataError, Either } from "../../../shared/domain";

export class GetItemsUseCase {
  constructor(private itemRepository: ItemRepository) {}

  public execute(): Promise<Either<DataError, Item[]>> {
    return this.itemRepository.findAll();
  }
}
