import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth, { verifyAuth } from './authSlice';

export const reducer = combineReducers({
  auth,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//@ts-ignore
store.dispatch(verifyAuth());

export default store;
