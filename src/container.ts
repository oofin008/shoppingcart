import { Container } from 'inversify'
import { TYPES } from './types'

import { CartRepository } from './domains/cart/cartRepository'
import { ItemRepository } from './domains/item/itemRepository'

const container = new Container()

container.bind<CartRepository>(TYPES.CartRepository).to(CartRepoImplInfraLevel)
container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemRepoImplInfraLevel)

export { container }
