import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'react-redux-firebase-auth';
import simpleValues from './simpleValuesSlice';

export const reducer = combineReducers({
  ...authReducer,
  simpleValues,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
