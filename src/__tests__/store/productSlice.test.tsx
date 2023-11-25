import React from 'react';
import {
  getProductList,
  productSlice,
  searchProductList,
  viewCart,
} from '../../store/product/productSlice';
import { mockCart, mockProduct } from '../../utils/dummyData';
import { store } from '../../store';
import { renderWithProviders } from '../../utils/test-util';
import ProductList from '../../pages/ProductList';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

jest.mock('react-slick', () => jest.fn());

const initialState = { products: [], cart: [], isLoading: false };

describe('Product slice tests', () => {
  it('Product List call', async () => {
    const action = {
      type: getProductList.fulfilled.type,
      payload: { data: mockProduct },
    };
    const state = productSlice.reducer(initialState, action);
    expect(state).toEqual({
      products: mockProduct,
      cart: [],
      isLoading: false,
    });
  });

  it('Product List call with empty data', async () => {
    const action = {
      type: getProductList.fulfilled.type,
      payload: { data: [] },
    };
    const state = productSlice.reducer(initialState, action);
    expect(state).toEqual({ products: [], cart: [], isLoading: false });
  });

  it('Search List call', async () => {
    const action = {
      type: searchProductList.fulfilled.type,
      payload: { data: mockProduct },
    };
    const state = productSlice.reducer(initialState, action);
    expect(state).toEqual({
      products: mockProduct,
      cart: [],
      isLoading: false,
    });
  });

  it('View Cart call', async () => {
    const action = {
      type: viewCart.fulfilled.type,
      payload: { data: mockCart },
    };
    const state = productSlice.reducer(initialState, action);
    expect(state).toEqual({ products: [], cart: mockCart, isLoading: false });
  });

  it('Get Product List Create Async Thunk call', async () => {
    store.dispatch(getProductList());

    renderWithProviders(<ProductList />, { store });
    renderWithProviders(<ProductList />);
  });
});
