import { ItemRepository } from "../itemRepository";
import { Item } from "../itemEntity";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetItemsUseCase {
    constructor(@inject(TYPES.ItemRepository) private itemRepository: ItemRepository) {}

    execute(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }
}
