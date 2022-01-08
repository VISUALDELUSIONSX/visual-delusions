import { createSlice } from '@reduxjs/toolkit';

interface SimpleValuesState {
  isCategoryAddDialogOpen: boolean;
  isCategoryDeleteDialogOpen: false | { id: string; name: string };
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
