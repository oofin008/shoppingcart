import { ItemProps, ItemId } from './itemInterface';

export class Item{
  public id: ItemId;
  public title: string;
  public price: number;
  public quantity: number;


  private constructor(props: ItemProps) {
    this.id = props.id
    this.title = props.title
    this.price = props.price
    this.quantity = this.validateQty(props.quantity)? props.quantity : 1
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

  private validateQty(quantity: number): boolean {
    return quantity >= 1
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
