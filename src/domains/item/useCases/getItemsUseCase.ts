import { ItemRepository } from "../itemRepository";
import { Item } from "../itemEntity";
import { DataError, Either } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetItemsUseCase {
  constructor(@inject(TYPES.ItemRepository) private itemRepository: ItemRepository) {}

  public execute(): Promise<Either<DataError, Item[]>> {
    return this.itemRepository.findAll();
  }
}
