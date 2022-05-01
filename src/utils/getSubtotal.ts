import { CartItem } from '../types/client';

const getSubtotal = (cartItems: CartItem[]) =>
  cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);

export default getSubtotal;
