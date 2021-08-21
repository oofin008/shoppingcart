import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { DataError, Either } from "../../../shared/domain";

export class GetItemByIdUseCase {
  constructor(private itemRepository: ItemRepository) {}

  public execute(id: string): Promise<Either<DataError, Item>> {
    return this.itemRepository.getById(id);
  }
}
