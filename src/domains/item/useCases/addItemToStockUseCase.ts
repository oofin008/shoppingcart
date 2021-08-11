import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { ItemRepository } from "../itemRepository";
import { Either, DataError, EitherAsync } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class AddItemToStockUseCase {
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository;

    execute(item: Item): Promise<Item> {
      return this.itemRepository.insert(item);
    }
}
