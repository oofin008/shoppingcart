import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { 
  CartRepository, 
  ItemRepository,
  AddItemToCartUseCase,
  RemoveItemFromCartUseCase,
  GetCartUseCase,
  EditCartItemUseCase,
  AddItemToStockUseCase,
  UpdateItemInStockUseCase,
  GetItemsUseCase,
  GetItemByIdUseCase
} from './domains'

import { HTTPController } from './api/http/controller'
import { HTTPRouter } from './api/http/router'
import { Server, IServer } from './api/http/server'

import { MemoryData } from './shared/data/memoryData'
import { CartMemoryRepositoryImpl } from './domains/cart/data'
import { ItemMemoryRepositoryImpl } from './domains/item/data'

const container = new Container()

container.bind(TYPES.HTTPController).to(HTTPController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()

container.bind(TYPES.AddItemToCartUseCase).to(AddItemToCartUseCase)
container.bind(TYPES.RemoveItemFromCartUseCase).to(RemoveItemFromCartUseCase)
container.bind(TYPES.GetCartUseCase).to(GetCartUseCase)
container.bind(TYPES.EditCartItemUseCase).to(EditCartItemUseCase)

container.bind(TYPES.AddItemToStockUseCase).to(AddItemToStockUseCase)
container.bind(TYPES.UpdateItemStockUseCase).to(UpdateItemInStockUseCase)
container.bind(TYPES.GetItemUseCase).to(GetItemsUseCase)
container.bind(TYPES.GetItemByIdUseCase).to(GetItemByIdUseCase)

container.bind(TYPES.Database).to(MemoryData).inSingletonScope()
container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepositoryImpl)
container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepositoryImpl)

export { container }
