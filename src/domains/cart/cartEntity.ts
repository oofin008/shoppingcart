import cuid from "cuid";
import { CartProps, CartId, TotalPrice, TotalItem } from "./cartInterface";
import { ItemProps } from "../item/itemInterface";

export class Cart {
  private _id: CartId;
  private _items: ItemProps[];
  private _totalPrice: TotalPrice;
  private _totalItems: TotalItem;

  private constructor(props: CartProps) {
    this._id = props.id ? props.id : cuid();
    this._items = props.items;
    this._totalPrice = this.calculateTotalPrice(props.items);
    this._totalItems = this.calculateTotalItems(props.items);
  }

  public static create(props: CartProps): Cart {
    return new Cart(props);
  }

  public addItem(item: ItemProps): void {
    const existedIndex = this._items.findIndex((i) => i.id === item.id);

    if (existedIndex > -1) {
      const addedItem: ItemProps = {
        ...this._items[existedIndex],
        quantity: this._items[existedIndex].quantity + item.quantity,
      };
      const newItemsList: ItemProps[] = [
        ...this._items.slice(0, existedIndex),
        addedItem,
        ...this._items.slice(existedIndex + 1),
      ];
      this._items = newItemsList;
    } else {
      this._items = [...this._items, item];
    }
    this.updateTotalPriceAndTotalItems();
  }

  public removeItem(itemId: string): void {
    const newItemsList = this._items.filter(
      (item) => item.id !== itemId,
    )
    this._items = newItemsList
    this.updateTotalPriceAndTotalItems();
  }

  private calculateTotalPrice(products: ItemProps[]): TotalPrice {
    return products.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.quantity;
    }, 0);
  }

  private calculateTotalItems(products: ItemProps[]): TotalItem {
    return products.reduce((totalItem, item) => {
      return totalItem + item.quantity;
    }, 0);
  }

  private updateTotalPriceAndTotalItems(): void {
    this._totalPrice = this.calculateTotalPrice(this._items);
    this._totalItems = this.calculateTotalItems(this._items);
  }

  get id(): CartId {
    return this._id;
  }
  get items(): ItemProps[] {
    return this._items;
  }
  get totalPrice(): TotalPrice {
    return this._totalPrice;
  }
  get totalItems(): TotalItem {
    return this._totalItems;
  }
}
