const TYPES = {
  Logger: Symbol.for('Logger'),
  Database: Symbol.for('Database'),

  Server: Symbol.for('Server'),
  HTTPController: Symbol.for('HTTPController'),
  HTTPRouter: Symbol.for('HTTPRouter'),

  // CartService: Symbol.for('CartService'),
  CartRepository: Symbol.for('CartRepository'),
  // ItemService: Symbol.for('ItemService'),
  ItemRepository: Symbol.for('ItemRepository'),

  AddItemToCartUseCase: Symbol.for('AddItemToCartUseCase'),
  RemoveItemFromCartUseCase: Symbol.for('RemoveItemFromCartUseCase'),
  GetCartUseCase: Symbol.for('GetCartUseCase'),
  EditCartItemUseCase: Symbol.for('EditCartItemUseCase'),

  AddItemToStockUseCase: Symbol.for('AddItemToStockUseCase'),
  GetItemByIdUseCase: Symbol.for('GetItemByIdUseCase'),
  GetItemUseCase: Symbol.for('GetItemUseCase'),
}

export { TYPES }
