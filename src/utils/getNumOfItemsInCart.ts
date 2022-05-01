import { CartItem } from '../types/client';

const getNumOfItemsInCart = (cartItems: CartItem[]) =>
  cartItems.reduce(
    (acc, cur) => acc + (cur.savedForLater ? 0 : cur.quantity),
    0
  );

export default getNumOfItemsInCart;
