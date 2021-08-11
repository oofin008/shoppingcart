import { RouterContext } from '@koa/router'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
// import { Item } from '../../domain/item'
// import { ItemService } from '../../app/item'
// import { CartService } from '../../app/cart'
import { 
  AddItemToCartUseCase,
  GetCartUseCase,
  EditCartItemUseCase,
  RemoveItemFromCartUseCase,
  GetItemsUseCase,
  AddItemToStockUseCase,
  GetItemByIdUseCase
} from '../../domains'
import { validateCreateItem } from './validation/item'
import { validateAddToCart } from './validation/cart'

@injectable()
export class HTTPController {
  @inject(TYPES.AddItemToCartUseCase) private _addItemToCartUseCase: AddItemToCartUseCase
  @inject(TYPES.GetCartUseCase) private _getCartUseCase: GetCartUseCase
  @inject(TYPES.EditCartItemUseCase) private _editCartItemUseCase: EditCartItemUseCase
  @inject(TYPES.RemoveItemFromCartUseCase) private _removeItemFromCartUseCase: RemoveItemFromCartUseCase
  @inject(TYPES.GetItemUseCase) private _getItemsUseCase: GetItemsUseCase
  @inject(TYPES.AddItemToStockUseCase) private _addItemToStockUseCase: AddItemToStockUseCase
  @inject(TYPES.GetItemByIdUseCase) private _getItemByIdUseCase: GetItemByIdUseCase

  public async listItems(ctx: RouterContext): Promise<void> {
    const items = await this._getItemsUseCase.execute();
    ctx.body = items.map((item) => item)
  }

  // public async getItem(ctx: RouterContext): Promise<void> {
  //   const item = await this._itemService.getById(ctx.params.id)
  //   ctx.body = item.unmarshal()
  // }

  public async createItem(ctx: RouterContext): Promise<void> {
    const input = validateCreateItem(
      ctx.request.body as Record<string, unknown>,
    )
    const created = await this._addItemToStockUseCase.execute(input);

    ctx.body = created.map(item => item.unmarshal())
  }

  // public async getCart(ctx: RouterContext): Promise<void> {
  //   const cart = await this._getCartUseCase.execute(ctx.params.id)
  //   ctx.body = cart.map(() => cart)
  // }

  // public async addToCart(ctx: RouterContext): Promise<void> {
  //   const { cartId } = ctx.params
  //   const { itemId, quantity } = validateAddToCart(
  //     ctx.request.body as Record<string, unknown>,
  //   )

  //   const item = await this._itemService.getById(itemId)
  //   const cart = await this._cartService.add(cartId, item, quantity)

  //   ctx.body = cart.unmarshal()
  // }

  // public async removeFromCart(ctx: RouterContext): Promise<void> {
  //   const { cartId, itemId } = ctx.params
  //   const cart = await this._cartService.remove(cartId, itemId)
  //   ctx.body = cart.unmarshal()
  // }

  // public async emptyCart(ctx: RouterContext): Promise<void> {
  //   const { cartId } = ctx.params
  //   await this._cartService.empty(cartId)
  //   ctx.body = null
  // }
}
