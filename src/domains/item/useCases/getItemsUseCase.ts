import { ItemRepository } from "../itemRepository";
import { Either, DataError } from "../../../shared/domain";
import { ItemProps } from "../itemInterface";

export class GetItemsUseCase {
    private itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }

    execute(): Promise<Either<DataError, ItemProps[]>> {
        return this.itemRepository.getAll();
    }
}
