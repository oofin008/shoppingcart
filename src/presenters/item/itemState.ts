import { ItemProps } from "../../domains";

export interface LoadingItemState {
    kind: "LoadingProductsState";
}

export interface LoadedItemState {
    kind: "LoadedProductsState";
    products: Array<ItemProps>;
}

export interface ErrorItemState {
    kind: "ErrorItemState";
    error: string;
}

export type ItemState = (LoadingItemState | LoadedItemState | ErrorItemState)

export const itemInitialState: ItemState = {
    kind: "LoadingProductsState",
};
