import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productServices from '../services/product';

export const getProductList = createAsyncThunk('productList', async () => {
  const response = await productServices.products();
  return response;
});

export const searchProductList = createAsyncThunk('search', async (value: string) => {
  const response = await productServices.searchProduct(value);
  return response;
});

export const addToCart = createAsyncThunk('addToCart', async (value: string) => {
  const response = await productServices.addToCart(value);
  return response;
});

export const subtractFromCart = createAsyncThunk('subtractFromCart', async (value: string) => {
  const response = await productServices.subtractFromCart(value);
  return response;
});

export const viewCart = createAsyncThunk('viewCart', async () => {
  const response = await productServices.viewCart();
  return response;
});

export interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  discount: string;
}

export interface ICart {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const initialState: {
  products: IProduct[];
  cart: ICart[];
  isLoading: boolean;
} = {
  products: [],
  cart: [],
  isLoading: true,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.products = action?.payload?.data;
      state.isLoading = false;
    });
    builder.addCase(searchProductList.fulfilled, (state, action) => {
      state.products = action?.payload?.data;
      state.isLoading = false;
    });
    builder.addCase(viewCart.fulfilled, (state, action) => {
      if (Array.isArray(action?.payload?.data)) {
        state.cart = action?.payload?.data;
      }
    });
  },
});

export const { stopLoading, startLoading } = productSlice.actions;
