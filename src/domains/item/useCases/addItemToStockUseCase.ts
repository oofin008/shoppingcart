import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { DataError, Either } from "../../../shared/domain";

export class AddItemToStockUseCase {
  constructor(private itemRepository: ItemRepository) {}

  public execute(item: Item): Promise<Either<DataError, Item>> {
    return this.itemRepository.insert(item);
  }
}
