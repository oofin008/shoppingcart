import { CartProps, CartId, TotalPrice, TotalItem } from "./cartInterface";
import { ItemProps } from "../item/itemInterface";

export class Cart {
  public id: CartId;
  public items: ItemProps[];

  private constructor(props: CartProps) {
    this.id = props.id;
    this.items = props.items;
  }

  // need validation logic here
  public static create(props: CartProps): Cart {
    return new Cart(props);
  }

  public addItem(item: ItemProps): void {
    console.log('itemEntity additem => ', item);
    const existedIndex = this.items.findIndex((i) => i.id === item.id);

    if (existedIndex > -1) {
      const addedItem: ItemProps = {
        ...this.items[existedIndex],
        quantity: this.items[existedIndex].quantity + 1,
      };
      const newItemsList: ItemProps[] = [
        ...this.items.slice(0, existedIndex),
        addedItem,
        ...this.items.slice(existedIndex + 1),
      ];
      this.updateCart(newItemsList);
    } else {
      this.updateCart([...this.items, {...item, quantity: 1}]);
    }
  }

  public getItem(itemId: string): ItemProps | undefined {
    return this.items.find((item) => item.id === itemId);
  }


  public removeItem(itemId: string): void {
    const newItemsList = this.items.filter((item) => item.id !== itemId);
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
      id: this.id,
      items: this.items,
    };
  }

  public getTotalPrice(): TotalPrice {
    return this.items.reduce((totalPrice, item) => {
      return totalPrice + (item.price * item.quantity);
    }, 0);
  }

  public getTotalItems(): TotalItem {
    return this.items.reduce((totalItem, item) => {
      return totalItem + item.quantity;
    }, 0);
  }

  private updateCart(items: ItemProps[]): void {
    this.items = items;
  }

}
