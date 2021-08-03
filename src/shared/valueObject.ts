import deepEqual from 'deep-equal';

const isValueObject = <T>(v: ValueObject<T>): v is ValueObject<T> => {
  return v instanceof ValueObject
}

export abstract class ValueObject<T> {
  protected props: T

  constructor(props: T) {
    this.props = props
  }

  public equals(object?: ValueObject<T>): boolean {
    if (object == null) {
      return false
    }
    
    if (!isValueObject(object)) {
      return false
    }

    return deepEqual(this, object)
  }
}
