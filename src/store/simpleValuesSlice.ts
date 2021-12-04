import { createSlice } from '@reduxjs/toolkit';

interface SimpleValuesState {
  isAddCategoryDialogOpen: boolean;
}

const initialState: SimpleValuesState = {
  isAddCategoryDialogOpen: false,
};

export const simpleValuesSlice = createSlice({
  name: 'simpleValues',
  initialState,
  reducers: {
    setIsAddCategoryDialogOpen: (state, action) => {
      state.isAddCategoryDialogOpen = action.payload;
    },
  },
});

export const { setIsAddCategoryDialogOpen } = simpleValuesSlice.actions;

export default simpleValuesSlice.reducer;
