import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../types/client';

interface SimpleValuesState {
  isCategoryAddDialogOpen: boolean | Category;
  isCategoryDeleteDialogOpen:
    | false
    | { id: string; name: string; imgId?: string };
}

const initialState: SimpleValuesState = {
  isCategoryAddDialogOpen: false,
  isCategoryDeleteDialogOpen: false,
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
  },
});

export const { setIsCategoryAddDialogOpen, setIsCategoryDeleteDialogOpen } =
  simpleValuesSlice.actions;

export default simpleValuesSlice.reducer;
