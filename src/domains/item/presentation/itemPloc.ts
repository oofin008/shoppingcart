import { DataError } from "../../../shared/domain";
import { Ploc } from "../../../shared/presentation";
import { Item } from "../itemEntity";
import { ItemProps } from "../itemInterface";
import { GetItemsUseCase } from "../useCases/getItemsUseCase";
import { AddItemToStockUseCase } from "../useCases/addItemToStockUseCase";
import { itemInitialState, ItemState } from "./itemState";

export class ItemPloc extends Ploc<ItemState> {
  constructor(
    private getItemUseCase: GetItemsUseCase,
    private addItemToStockUseCase: AddItemToStockUseCase
  ) {
    super(itemInitialState);

    this.addToStock([
      { id: '1', title: 'Product 1', price: 10, quantity: 10 },
      { id: '2', title: 'Product 2', price: 20, quantity: 20 },
      { id: '3', title: 'Product 3', price: 30, quantity: 30 },
      { id: '4', title: 'Product 4', price: 40, quantity: 40 },
    ])
  }

  async search(searchTerm: string) {
    const productResult = await this.getItemUseCase.execute();

    productResult.fold(
      (error) => this.changeState(this.handleError(searchTerm, error)),
      (products) =>
        this.changeState({
          kind: "LoadedProductsState",
          products,
          searchTerm,
        })
    );
  }

  private async addToStock(itemList: ItemProps[]) {
    const items = itemList.map((val) => Item.create(val));
    let products = new Array<ItemProps>();

    for (const item of items) {
      const result = await this.addItemToStockUseCase.execute(item);
      result.fold(
        (error) => this.changeState(this.handleError("", error)),
        (item) => products.push(item.unmarshal())
      );
    }
  }

  private handleError(searchTerm: string, error: DataError): ItemState {
    switch (error.kind) {
      case "UnexpectedError": {
        return {
          searchTerm,
          kind: "ErrorProductsState",
          error: "Sorry, an error has ocurred. Please try later again",
        };
      }
    }
  }
}
