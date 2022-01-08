import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, AuthReducer } from 'react-redux-firebase-auth';
import { User } from '../types/client';
import simpleValues from './simpleValuesSlice';

export const reducer = combineReducers({
  auth: authReducer as AuthReducer<User>,
  simpleValues,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
