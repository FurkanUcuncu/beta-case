import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './product/productSlice';
import { authSlice } from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
