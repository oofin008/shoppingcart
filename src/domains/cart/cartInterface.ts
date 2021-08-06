import { ItemProps } from '../item/itemInterface';

export interface CartItem {
  item: ItemProps
  quantity: number
}

export interface CartProps {
  id?: string
  products?: CartItem[]
}
