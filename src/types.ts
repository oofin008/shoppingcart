const TYPES = {
  Logger: Symbol.for('Logger'),
  Database: Symbol.for('Database'),

  CartRepository: Symbol.for('CartRepository'),
  ItemRepository: Symbol.for('ItemRepository'),

  AddItemToCartUseCase: Symbol.for('AddItemToCartUseCase'),
  RemoveItemFromCartUseCase: Symbol.for('RemoveItemFromCartUseCase'),
  GetCartUseCase: Symbol.for('GetCartUseCase'),
  EditCartItemUseCase: Symbol.for('EditCartItemUseCase'),
  CreateCartUseCase: Symbol.for('CreateCartUseCase'),

  AddItemToStockUseCase: Symbol.for('AddItemToStockUseCase'),
  UpdateItemStockUseCase: Symbol.for('UpdateItemStockUseCase'),
  GetItemByIdUseCase: Symbol.for('GetItemByIdUseCase'),
  GetItemUseCase: Symbol.for('GetItemUseCase'),

  Ploc: Symbol.for('Ploc'),
  CartPloc: Symbol.for('CartPloc'),
  ItemPloc: Symbol.for('ItemPloc'),
}

export { TYPES }
