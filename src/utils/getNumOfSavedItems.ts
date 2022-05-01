import { CartItem } from '../types/client';

const getNumOfSavedItems = (cartItems: CartItem[]) =>
  cartItems.reduce((acc, cur) => acc + (cur.savedForLater ? 1 : 0), 0);

export default getNumOfSavedItems;
