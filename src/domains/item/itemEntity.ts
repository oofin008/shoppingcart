import { ItemProps, ItemId } from './itemInterface';

export class Item{
  private _id: ItemId;
  private _title: string;
  private _price: number;
  private _quantity: number;


  private constructor(props: ItemProps) {
    this._id = props.id
    this._title = props.title
    this._price = props.price
    this._quantity = props.quantity > 0 ? props.quantity : 1
  }

  public static create(props: ItemProps): Item {
    const instance = new Item(props)
    return instance
  }

  public unmarshal(): ItemProps {
    return {
      id: this.id,
      title: this._title,
      price: parseFloat(this.price.toString()),
      quantity: parseInt(this.quantity.toString())
    }
  }

  get id(): string {
    return this._id
  }
  get title(): string {
    return this._title
  }
  get price(): number {
    return this._price
  }
  get quantity(): number {
    return this._quantity
  }

}
