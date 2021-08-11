import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { Either, DataError } from "../../../shared/domain";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetItemByIdUseCase {
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository;

    // constructor(itemRepository: ItemRepository) {
    //     this.itemRepository = itemRepository;
    // }

    execute(id:string): Promise<Either<DataError, Item>> {
      return this.itemRepository.getById(id);
    }
}
