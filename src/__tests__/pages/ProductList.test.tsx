import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { CircularProgress } from '@mui/material';
import ProductList from '../../pages/ProductList';
import { ReduxWrapper } from '../../components/ReduxWrapper';
import { renderWithProviders } from '../../utils/test-util';
import { mockProduct } from '../../utils/dummyData';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

jest.mock('react-slick', () => jest.fn());

const initialCommon = {
  cart: [],
  isLoading: false,
};

const initialStateWithData = {
  product: {
    products: mockProduct,
    ...initialCommon,
  },
};

const initialStateWithEmptyData = {
  product: {
    products: [],
    ...initialCommon,
  },
};

describe('ProductList component Test', () => {
  it('ProductList render', () => {
    render(
      <Suspense fallback={<CircularProgress />}>
        <ProductList />
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('ProductList render with mock data', () => {
    renderWithProviders(<ProductList />, {
      preloadedState: { ...initialStateWithData },
    });
  });

  it('ProductList render with empty data', () => {
    renderWithProviders(<ProductList />, {
      preloadedState: { ...initialStateWithEmptyData },
    });
  });
});
