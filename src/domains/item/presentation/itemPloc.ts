import { DataError } from "../../../shared/domain";
import { Ploc } from "../../../shared/presentation";
import { GetItemsUseCase } from "../useCases/getItemsUseCase";
import { productsInitialState, ItemState } from "./itemState";

export class ItemPloc extends Ploc<ItemState> {
    constructor(private getProductsUseCase: GetItemsUseCase) {
        super(productsInitialState);
    }

    async search() {
        const productResult = await this.getProductsUseCase.execute();

        productResult.fold(
            error => this.changeState(this.handleError(error)),
            products =>
                this.changeState({
                    kind: "LoadedProductsState",
                    products,
                    searchTerm: "item",
                })
        );
    }

    private handleError(error: DataError): ItemState {
        switch (error.kind) {
            case "UnexpectedError": {
                return {
                  searchTerm: "item",
                  kind: "ErrorProductsState",
                  error: "Sorry, an error has ocurred. Please try later again",
                };
            }
        }
    }
}
