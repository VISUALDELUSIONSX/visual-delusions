import { createSlice } from '@reduxjs/toolkit';
import { Category, ShopItem } from '../types/client';

interface SimpleValuesState {
  isCategoryAddDialogOpen: boolean | Category;
  isCategoryDeleteDialogOpen:
    | false
    | { id: string; name: string; imgId?: string };
  isShopItemAddDialogOpen: boolean | ShopItem;
  isShopItemDeleteDialogOpen:
    | false
    | { id: string; name: string; images?: { id: string }[] };
}

const initialState: SimpleValuesState = {
  isCategoryAddDialogOpen: false,
  isCategoryDeleteDialogOpen: false,
  isShopItemAddDialogOpen: false,
  isShopItemDeleteDialogOpen: false,
};

export const simpleValuesSlice = createSlice({
  name: 'simpleValues',
  initialState,
  reducers: {
    setIsCategoryAddDialogOpen: (state, action) => {
      state.isCategoryAddDialogOpen = action.payload;
    },
    setIsCategoryDeleteDialogOpen: (state, action) => {
      state.isCategoryDeleteDialogOpen = action.payload;
    },
    setIsShopItemAddDialogOpen: (state, action) => {
      state.isShopItemAddDialogOpen = action.payload;
    },
    setIsShopItemDeleteDialogOpen: (state, action) => {
      state.isShopItemDeleteDialogOpen = action.payload;
    },
  },
});

export const {
  setIsCategoryAddDialogOpen,
  setIsCategoryDeleteDialogOpen,
  setIsShopItemAddDialogOpen,
  setIsShopItemDeleteDialogOpen,
} = simpleValuesSlice.actions;

export default simpleValuesSlice.reducer;
