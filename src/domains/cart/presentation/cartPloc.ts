import { CartState, cartInitialState, CartItemState } from "./CartState";
import { Ploc } from "../../../shared/presentation";
import { GetCartUseCase } from "../useCases/getCartUseCase";
import { AddItemToCartUseCase } from "../useCases/addItemToCartUseCase";
import { RemoveItemFromCartUseCase } from "../useCases/removeItemFromCartUseCase";
import { EditCartItemUseCase } from "../useCases/editCartItemUseCase";
import { ItemProps } from "../../item/itemInterface";
import { Cart } from "../cartEntity";
import { DataError } from "../../../shared/domain";

export class CartPloc extends Ploc<CartState> {
    constructor(
        private _cartId: string,
        private getCartUseCase: GetCartUseCase,
        private addItemToCartUseCase: AddItemToCartUseCase,
        private removeItemFromCartUseCase: RemoveItemFromCartUseCase,
        private editCartItemUseCase: EditCartItemUseCase
    ) {
        super(cartInitialState);

        this.loadCart();
    }

    closeCart() {
        this.changeState({ ...this.state, open: false });
    }

    openCart() {
        this.changeState({ ...this.state, open: true });
    }

    async removeCartItem(item: CartItemState) {
        const result = await this.removeItemFromCartUseCase.execute(this._cartId,item.id);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    async editQuantityCartItem(item: CartItemState, quantity: number) {
        const result = await this.editCartItemUseCase.execute(this._cartId,item.id, quantity);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    async addProductToCart(product: ItemProps) {
        const result = await this.addItemToCartUseCase.execute(this._cartId,product);

        result.fold(
            error => this.changeState(this.handleError(error)),
            cart => this.changeState(this.mapToUpdatedState(cart))
        );
    }

    private async loadCart() {
        const result = await this.getCartUseCase.execute(this._cartId);

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
            totalItems: cart.totalItems,
            totalPrice: cart.totalPrice.toLocaleString("es-ES", formatOptions),
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
