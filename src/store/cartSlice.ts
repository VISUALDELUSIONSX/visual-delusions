import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/client';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTocart: (state, action: { payload: CartItem }) => {
      const inCart = state.items.find((item) => item.id === action.payload.id);
      if (inCart) {
        // increase quantity
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id)
            item.quantity = item.quantity + action.payload.quantity;
          return item;
        });
      } else {
        // add item to cart
        state.items = [...state.items, action.payload];
      }
    },
    removeFromCart: (
      state,
      action: { payload: { id: string; quantity?: number } }
    ) => {
      const quantity = action.payload.quantity;
      if (quantity) {
        state.items = state.items
          // reduce quantity
          .map((item) => {
            if (item.id === action.payload.id)
              item.quantity = item.quantity - quantity;
            return item;
          })
          // filter out item if its quantity has been reduced below 1
          .filter((item) => item.quantity > 0);
      } else {
        // remove item from cart
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addTocart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
