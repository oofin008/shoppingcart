import { Entity } from '../../shared/entity'

export interface UnmarshalledItem {
  id?: string;
  displayName: string;
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
    }
  }

  get id(): string {
    return this._id
  }

  get displayName(): string {
    return this.props.displayName
  }

}
