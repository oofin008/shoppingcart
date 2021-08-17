import { Item } from "../itemEntity";
import { ItemRepository } from "../itemRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { DataError, Either } from "../../../shared/domain";

@injectable()
export class GetItemByIdUseCase {
  constructor(
    @inject(TYPES.ItemRepository) private itemRepository: ItemRepository
  ) {}

  public execute(id: string): Promise<Either<DataError, Item>> {
    return this.itemRepository.getById(id);
  }
}
