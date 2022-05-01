import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, AuthReducer } from 'react-redux-firebase-auth';
import { User } from '../types/client';
import { persistReducer } from 'redux-persist';
import simpleValues from './simpleValuesSlice';
import cart from './cartSlice';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

export const reducer = combineReducers({
  auth: authReducer as AuthReducer<User>,
  cart,
  simpleValues,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['cart'],
  },
  reducer
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const getStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV === 'development',
  });

  let persistor = persistStore(store);
  return { store, persistor };
};

export default getStore;
