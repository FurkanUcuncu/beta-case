import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import { productSlice } from './product/productSlice';
import { authSlice } from './auth/authSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  product: productSlice.reducer,
});

function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      product: productSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const store = setupStore();
