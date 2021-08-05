import { Entity } from '../../shared/entity';
import { CartProps, CartItem } from './cartInterface';
import { ItemProps } from '../item/itemInterface';



export class Cart extends Entity<CartProps> {
  private _products: CartItem[];

  private constructor(props: CartProps) {
    const {id, ...data} = props
    super(data, id)
    this._products = [];
  }

  public static create(props: CartProps): Cart {
    const instance = new Cart(props)
    instance.products = instance.props.rawProducts || []
    return instance
  }

  public add(item: ItemProps, quantity: number): void {
    if (!Cart.validQuantity(quantity)) {
      throw new Error(
        'Unit needs to have a quantity between 1 and 1000',
      )
    }

    const index = this.products.findIndex((p) => p.item.id === item.id)

    if (index > -1) {
      const product = {
        ...this.products[index],
        quantity: this.products[index].quantity + quantity,
      }

      if (!Cart.validQuantity(product.quantity)) {
        throw new Error('Units exceeded allowed quantity')
      }

      const products = [
        ...this.products.slice(0, index),
        product,
        ...this.products.slice(index + 1),
      ]

      this.products = products
    } else {
      this.products = [...this.products, { item, quantity }]
    }
  }

  public remove(itemId: string): void {
    const products = this.products.filter(
      (product) => product.item.id !== itemId,
    )
    this.products = products
  }

  public empty(): void {
    this.products = []
  }

  private static validQuantity(quantity: number) {
    return quantity >= 1 && quantity <= 1000
  }

  get id(): string {
    return this._id
  }

  get products(): CartItem[] {
    return this._products
  }

  set products(products: CartItem[]) {
    this._products = products.map((p) => ({
      item: p.item,
      quantity: p.quantity,
    }))
  }

}
