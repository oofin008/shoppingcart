import { ItemProps } from '../item/itemInterface';

export type CartId = string;
export type TotalPrice = number;
export type TotalItem = number;
export interface CartProps {
  readonly id: CartId;
  readonly items: ItemProps[]
}
