export interface LoadingCartState {
  kind: "LoadingCartState";
}

export interface UpdatedCartState {
  kind: "UpdatedCartState";
  items: Array<CartItemState>;
  totalPrice: string;
  totalItems: number;
}

export interface ErrorCartState {
  kind: "ErrorCartState";
  error: string;
}

export type CartState = (LoadingCartState | UpdatedCartState | ErrorCartState);

export interface CartItemState {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

export const cartInitialState: CartState = {
  kind: "LoadingCartState",
};
