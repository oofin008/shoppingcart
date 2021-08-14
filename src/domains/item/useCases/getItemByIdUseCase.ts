import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetItemByIdUseCase {
  constructor(
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository
  ) {}

  public execute(id: string): Promise<Item> {
    return this.itemRepository.getById(id);
  }
}
