import { Entity } from '../../shared/entity'
import { ItemProps } from './itemInterface';

export class Item extends Entity<ItemProps> {
  private constructor(props: ItemProps) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: ItemProps): Item {
    const instance = new Item(props)
    return instance
  }

  public unmarshal(): ItemProps {
    return {
      id: this.id,
      displayName: this.displayName,
      price: parseFloat(this.price.toString()),
    }
  }

  get id(): string {
    return this._id
  }

  get displayName(): string {
    return this.props.displayName
  }

  get price(): number {
    return this.props.price
  }

}
