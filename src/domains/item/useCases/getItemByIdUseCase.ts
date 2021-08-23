import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { DataError, Either } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetItemByIdUseCase {
  constructor(@inject(TYPES.ItemRepository) private itemRepository: ItemRepository) {}

  public execute(id: string): Promise<Either<DataError, Item>> {
    return this.itemRepository.getById(id);
  }
}
