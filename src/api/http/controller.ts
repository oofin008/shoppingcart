import { RouterContext } from '@koa/router'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { 
  AddItemToCartUseCase,
  GetCartUseCase,
  EditCartItemUseCase,
  RemoveItemFromCartUseCase,
  GetItemsUseCase,
  AddItemToStockUseCase,
  GetItemByIdUseCase,
  Item,
  UpdateItemInStockUseCase
} from '../../domains'
import { validateCreateItem } from './validation/item'
import { validateAddToCart, validateModifyCart } from './validation/cart'

@injectable()
export class HTTPController {
  @inject(TYPES.AddItemToCartUseCase) private _addItemToCartUseCase: AddItemToCartUseCase
  @inject(TYPES.GetCartUseCase) private _getCartUseCase: GetCartUseCase
  @inject(TYPES.EditCartItemUseCase) private _editCartItemUseCase: EditCartItemUseCase
  @inject(TYPES.RemoveItemFromCartUseCase) private _removeItemFromCartUseCase: RemoveItemFromCartUseCase
  @inject(TYPES.GetItemUseCase) private _getItemsUseCase: GetItemsUseCase
  @inject(TYPES.UpdateItemStockUseCase) private _updateItemInStockUseCase: UpdateItemInStockUseCase
  @inject(TYPES.AddItemToStockUseCase) private _addItemToStockUseCase: AddItemToStockUseCase
  @inject(TYPES.GetItemByIdUseCase) private _getItemByIdUseCase: GetItemByIdUseCase

  public async listItems(ctx: RouterContext): Promise<void> {
    const items = await this._getItemsUseCase.execute();
    ctx.body = items.map((item) => item.unmarshal())
  }

  public async getItem(ctx: RouterContext): Promise<void> {
    const item = await this._getItemByIdUseCase.execute(ctx.params.id)
    ctx.body = item.unmarshal()
  }

  public async createItem(ctx: RouterContext): Promise<void> {
    const input = validateCreateItem(
      ctx.request.body as Record<string, unknown>,
    )
    const item = Item.create(input)
    const created = await this._addItemToStockUseCase.execute(item);

    ctx.body = created.unmarshal()
  }

  public async getCart(ctx: RouterContext): Promise<void> {
    const cart = await this._getCartUseCase.execute(ctx.params.id)
    ctx.body = cart.unmarshal()
  }

  public async addToCart(ctx: RouterContext): Promise<void> {
    const { cartId } = ctx.params
    const { itemId, quantity } = validateAddToCart(
      ctx.request.body as Record<string, unknown>,
    )
    const item = await this._getItemByIdUseCase.execute(itemId)
    if(item.quantity - quantity < 0) {
      throw new Error(`Not enough items in stock`)
    }
    const itemToCart = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: quantity,
    }
    const itemToStock = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity - quantity,
    }
    const cart = await this._addItemToCartUseCase.execute(cartId, itemToCart)
    const stock = await Item.create(itemToStock)
    await this._updateItemInStockUseCase.execute(stock)
    ctx.body = cart.unmarshal()
  }

  public async editCartItem(ctx: RouterContext): Promise<void> {
    const { cartId } = ctx.params
    const { itemId, quantity } = validateModifyCart(
      ctx.request.body as Record<string, unknown>,
    )
    const cartCheck = await this._getCartUseCase.execute(cartId);
    const itemQuantity = cartCheck.items.find((item) => item.id === itemId)
    if(itemQuantity.quantity + quantity < 0) {
      throw new Error(`Modify quantity exceed number in cart`)
    }

    const cart = await this._editCartItemUseCase.execute(cartId, itemId, quantity)
    ctx.body = cart.unmarshal()
  }

  public async removeFromCart(ctx: RouterContext): Promise<void> {
    const { cartId, itemId } = ctx.params
    const cart = await this._removeItemFromCartUseCase.execute(cartId, itemId)
    ctx.body = cart.unmarshal()
  }

}
