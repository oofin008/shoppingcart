import { CartState, cartInitialState, CartItemState } from "./cartState";
import { Ploc } from "../../../shared/presentation/ploc";
import { GetCartUseCase } from "../useCases/getCartUseCase";
import { AddItemToCartUseCase } from "../useCases/addItemToCartUseCase";
import { RemoveItemFromCartUseCase } from "../useCases/RemoveItemFromCartUseCase";
import { EditCartItemUseCase } from "../useCases/editCartItemUseCase";
import { CreateCartUseCase } from "../useCases/createCartUseCase";
import { ItemProps } from "../../item/itemInterface";
import { Cart } from "../cartEntity";
import { DataError } from "../../../shared/domain";

export class CartPloc extends Ploc<CartState> {
    constructor(
        private getCartUseCase: GetCartUseCase,
        private addItemToCartUseCase: AddItemToCartUseCase,
        private removeItemFromCartUseCase: RemoveItemFromCartUseCase,
        private editCartItemUseCase: EditCartItemUseCase,
        private createCartUseCase: CreateCartUseCase
    ) {
        super(cartInitialState);

        this.createCart('A001', []);
    }

    closeCart() {
        this.changeState({ ...this.state, open: false });
    }

    openCart() {
        this.changeState({ ...this.state, open: true });
    }

    async removeCartItem(cartId:string, item: CartItemState) {
        const result = await this.removeItemFromCartUseCase.execute(cartId, item.id);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    async editQuantityCartItem(cartId: string, item: CartItemState, quantity: number) {
        const result = await this.editCartItemUseCase.execute(cartId, item.id, quantity);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    async addProductToCart(cartId: string, item: ItemProps) {
        const result = await this.addItemToCartUseCase.execute(cartId, item);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    private async loadCart(cartId: string) {
        const result = await this.getCartUseCase.execute(cartId);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    private async createCart(cartId: string, items: ItemProps[]) {
      const result = await this.createCartUseCase.execute(cartId, items);
      result.fold(
        error => this.changeState(this.handleError(error)),
        cart => this.changeState(this.mapToUpdatedState(cart))
      );
    }

    mapToUpdatedState(cart: Cart): CartState {
        const formatOptions = { style: "currency", currency: "EUR" };

        return {
            kind: "UpdatedCartState",
            open: this.state.open,
            totalItems: cart.getTotalItems(),
            totalPrice: cart.getTotalPrice().toLocaleString("es-ES", formatOptions),
            items: cart.items.map(cartItem => {
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
