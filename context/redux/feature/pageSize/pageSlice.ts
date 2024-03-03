import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageTypeState = {
  width: number;
  smallMode: boolean;
};

const initialState = {
  width: 1,
  smallMode: false,
} as PageTypeState;

export const pageChanger = createSlice({
  name: "pageType",
  initialState,
  reducers: {
    reset: () => initialState,
    changeWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    changeSmallMode: (state, action: PayloadAction<boolean>) => {
      state.smallMode = action.payload;
    },
  },
});

export const { changeWidth, changeSmallMode, reset } = pageChanger.actions;
export default pageChanger.reducer;
