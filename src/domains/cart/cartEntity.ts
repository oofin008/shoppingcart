import { CartProps, CartId, TotalPrice, TotalItem } from "./cartInterface";
import { ItemProps } from "../item/itemInterface";

export class Cart {
  private _id: CartId;
  private _items: ItemProps[];

  private constructor(props: CartProps) {
    this._id = props.id;
    this._items = props.items;
  }

  // need validation logic here
  public static create(props: CartProps): Cart {
    return new Cart(props);
  }

  public addItem(item: ItemProps): void {
    const existedIndex = this._items.findIndex((i) => i.id === item.id);

    if (existedIndex > -1) {
      const addedItem: ItemProps = {
        ...this._items[existedIndex],
        quantity: this._items[existedIndex].quantity + 1,
      };
      const newItemsList: ItemProps[] = [
        ...this._items.slice(0, existedIndex),
        addedItem,
        ...this._items.slice(existedIndex + 1),
      ];
      this.updateCart(newItemsList);
    } else {
      this.updateCart([...this._items, {...item, quantity: 1}]);
    }
  }

  public getItem(itemId: string): ItemProps | undefined {
    return this._items.find((item) => item.id === itemId);
  }


  public removeItem(itemId: string): void {
    const newItemsList = this._items.filter((item) => item.id !== itemId);
    this.updateCart(newItemsList);
  }

  public editItem(itemId: string, quantity: number): void {
    const newItemsList = this.items.map((oldItem) => {
      if (oldItem.id === itemId) {
        return { ...oldItem, quantity: quantity };
      } else {
        return oldItem;
      }
    });

    this.updateCart(newItemsList);
  }

  public unmarshal(): CartProps {
    return {
      id: this._id,
      items: this._items,
    };
  }

  public getTotalPrice(): TotalPrice {
    return this._items.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.quantity;
    }, 0);
  }

  public getTotalItems(): TotalItem {
    return this._items.reduce((totalItem, item) => {
      return totalItem + item.quantity;
    }, 0);
  }

  private updateCart(items: ItemProps[]): void {
    this._items = items;
  }

  get id(): CartId {
    return this._id;
  }
  get items(): ItemProps[] {
    return this._items;
  }
}
