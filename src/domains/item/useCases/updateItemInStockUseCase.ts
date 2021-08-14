import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class UpdateItemInStockUseCase {
  constructor(
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository
  ) {}

  public execute(item: Item): Promise<Item> {
    return this.itemRepository.update(item);
  }
}
