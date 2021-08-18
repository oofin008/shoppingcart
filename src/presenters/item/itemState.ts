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

export interface ErrorProductsState {
    kind: "ErrorProductsState";
    error: string;
}

export type ItemState = (LoadingItemState | LoadedItemState | ErrorProductsState) &
    CommonItemState;

export const itemInitialState: ItemState = {
    kind: "LoadingProductsState",
    searchTerm: "",
};
