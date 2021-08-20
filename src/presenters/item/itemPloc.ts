import { Ploc, DataError } from "../../shared";
import { Item, ItemProps, GetItemsUseCase, AddItemToStockUseCase } from "../../domains";
import { itemInitialState, ItemState } from "./itemState";

export class ItemPloc extends Ploc<ItemState> {
  constructor(
    private getItemUseCase: GetItemsUseCase,
    private addItemToStockUseCase: AddItemToStockUseCase
  ) {
    super(itemInitialState);

    this.addToStock([
      { id: '0001', title: 'product1', price: 10, quantity: 1 },
      { id: '0002', title: 'product2', price: 20, quantity: 2 },
      { id: '0003', title: 'product3', price: 30, quantity: 3 },
      { id: '0004', title: 'product4', price: 40, quantity: 4 },
    ])
  }

  public async search(searchTerm: string) {
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
