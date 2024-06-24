import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import fetchDataReducer from "./fetchDataSlice";
import auditioncallReducer from "./auditioncallSlice";
import filmReducer from './flimFestivalSlice'

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    fetchData: fetchDataReducer,
    createAudition: auditioncallReducer,
    film: filmReducer,
  },
});
export type AppDispatch = typeof store.dispatch;