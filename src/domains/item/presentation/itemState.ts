import { ItemProps } from "../itemInterface";

export interface CommonItemState {
    searchTerm: string;
}

export interface LoadingItemState {
    kind: "LoadingProductsState";
}

export interface LoadedItemState {
    kind: "LoadedProductsState";
    products: Array<ItemProps>;
}

export interface ErrorItemState {
    kind: "ErrorProductsState";
    error: string;
}

export type ItemState = (LoadingItemState | LoadedItemState | ErrorItemState) &
    CommonItemState;

export const productsInitialState: ItemState = {
    kind: "LoadingProductsState",
    searchTerm: "",
};
