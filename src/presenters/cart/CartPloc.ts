import { CartState, cartInitialState, CartItemState } from "./cartState";
import {
  GetCartUseCase,
  AddItemToCartUseCase,
  RemoveItemFromCartUseCase,
  EditCartItemUseCase,
  CreateCartUseCase,
  ItemProps,
  Cart,
} from "../../domains";
import { Ploc, DataError } from "../../shared";

export class CartPloc extends Ploc<CartState> {
  constructor(
    private getCartUseCase: GetCartUseCase,
    private addItemToCartUseCase: AddItemToCartUseCase,
    private removeItemFromCartUseCase: RemoveItemFromCartUseCase,
    private editCartItemUseCase: EditCartItemUseCase,
    private createCartUseCase: CreateCartUseCase
  ) {
    super(cartInitialState);

    // this.createCart("A001", []);
    this.loadCart("A001");
  }

  public closeCart() {
    this.changeState({ ...this.state, open: false });
  }

  public openCart() {
    this.changeState({ ...this.state, open: true });
  }

  public async removeCartItem(cartId: string, item: CartItemState) {
    const result = await this.removeItemFromCartUseCase.execute(
      cartId,
      item.id
    );
    console.log('removeCartItem');

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  public async editQuantityCartItem(
    cartId: string,
    item: CartItemState,
    quantity: number
  ) {
    const result = await this.editCartItemUseCase.execute(
      cartId,
      item.id,
      quantity
    );

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  public async addItemToCart(cartId: string, item: ItemProps) {
    const result = await this.addItemToCartUseCase.execute(cartId, item);
    console.log('addItemToCart', item);
    
    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  private async loadCart(cartId: string) {
    const result = await this.getCartUseCase.execute(cartId);
    console.log('loadCart');
    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  private async createCart(cartId: string, items: ItemProps[]) {
    const result = await this.createCartUseCase.execute(cartId, items);
    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  private mapToUpdatedState(cart: Cart): CartState {
    const formatOptions = { style: "currency", currency: "THB" };
    console.log('mapToUpdatedState = ', cart.unmarshal());

    return {
      kind: "UpdatedCartState",
      open: this.state.open,
      totalItems: cart.getTotalItems(),
      totalPrice: cart.getTotalPrice().toLocaleString("es-ES", formatOptions),
      items: cart.items.map((cartItem) => {
        console.log(cartItem);
        return {
          id: cartItem.id,
          title: cartItem.title,
          price: cartItem.price.toLocaleString("es-ES", formatOptions),
          quantity: cartItem.quantity,
        };
      }),
    };
  }

  private handleError(error: DataError): CartState {
    switch (error.kind) {
      case "UnexpectedError": {
        return {
          open: this.state.open,
          kind: "ErrorCartState",
          error: "Sorry, an error has ocurred. Please try later again",
        };
      }
    }
  }
}
