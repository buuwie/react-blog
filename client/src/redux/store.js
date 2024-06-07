import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js';
import themeReducer from './theme/themeSlice.js';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import expireInTransform from "redux-persist-transform-expire-in";

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
})

const expireIn = 12 * 60 * 60 * 1000; // expire in 48h
const expirationKey = "expirationKey";

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    transforms: [expireInTransform(expireIn, expirationKey, {
      currentUser: null,
      error: null,
      loading: false,
      theme: 'dark',
    })],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store);