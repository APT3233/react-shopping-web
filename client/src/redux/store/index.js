/**
 * Store Redux
 * Created at 21/03/2025
 */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";
import orderReducer from "../slices/orderSlice"; 

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "order"], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  order: orderReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);