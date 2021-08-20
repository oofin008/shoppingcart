import { ItemProps, ItemId } from './itemInterface';

export class Item{
  protected id: ItemId;
  protected title: string;
  protected price: number;
  protected quantity: number;


  private constructor(props: ItemProps) {
    this.id = props.id
    this.title = props.title
    this.price = props.price
    this.quantity = props.quantity
  }

  public static create(props: ItemProps): Item {
    const instance = new Item(props)
    return instance
  }

  public unmarshal(): ItemProps {
    return {
      id: this.id,
      title: this.title,
      price: parseFloat(this.price.toString()),
      quantity: parseInt(this.quantity.toString())
    }
  }

  public updateQuantity(quantity: number): void {
    this.quantity = quantity
  }

  public getItem(quantity: number): boolean {
    if (this.hasStock(quantity)) {
      this.quantity -= quantity
      return true
    }
    return false;
  }

  private hasStock(quantity: number): boolean {
    return this.quantity >= quantity
  }

}
