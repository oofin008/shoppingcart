import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { ItemRepository } from "../itemRepository";
import { Either, DataError, EitherAsync } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class AddItemToStockUseCase {
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository;

    // constructor(itemRepository: ItemRepository) {
    //     this.itemRepository = itemRepository;
    // }

    execute(item: ItemProps): Promise<Either<DataError, Item>> {
      return this.itemRepository.create(item);
    }
}
