import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class AddItemToStockUseCase {
  constructor(
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository
  ) {}

  execute(item: Item): Promise<Item> {
    return this.itemRepository.insert(item);
  }
}
