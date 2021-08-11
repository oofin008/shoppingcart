import { ItemRepository } from "../itemRepository";
import { Either, DataError, EitherAsync } from "../../../shared/domain";
import { ItemProps } from "../itemInterface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";

@injectable()
export class GetItemsUseCase {
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository;

    // constructor(itemRepository: ItemRepository) {
    //     this.itemRepository = itemRepository;
    // }

    execute(): Promise<Either<DataError, ItemProps[]>> {
        return this.itemRepository.getAll();
    }
}
