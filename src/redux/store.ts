import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tabsSlice from "./slices/tabs-slice";

export const store = configureStore({
  reducer: {
		tabs: tabsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();