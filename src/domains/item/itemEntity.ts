import { Entity } from '../../shared/entity'

export interface UnmarshalledItem {
  id?: string;
  displayName: string;
  price: number;
}

export class Item extends Entity<UnmarshalledItem> {
  private constructor(props: UnmarshalledItem) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledItem): Item {
    const instance = new Item(props)
    return instance
  }

  public unmarshal(): UnmarshalledItem {
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
