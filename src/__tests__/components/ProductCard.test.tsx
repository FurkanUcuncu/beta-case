import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import { ReduxWrapper } from '../../components/ReduxWrapper';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-util';
import { mockCart } from '../../utils/dummyData';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

const initialValues = {
  id: '2',
  discount: 'test',
  image: 'test',
  name: 'test',
  rating: 3,
  price: 5,
  originalPrice: 5,
};

const initialStateRedux = {
  product: {
    cart: mockCart,
    products: [],
    isLoading: false,
  },
};

describe('ProductCard component Test', () => {
  it('ProductCard render', () => {
    render(
      <Suspense fallback={<CircularProgress />}>
        <ProductCard {...initialValues} />
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
  it('Click add to cart button', () => {
    renderWithProviders(<ProductCard {...initialValues} />, {
      preloadedState: { ...initialStateRedux },
    });
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    userEvent.click(addToCartButton);
  });
  it('Click subtract from cart button', () => {
    renderWithProviders(<ProductCard {...initialValues} />, {
      preloadedState: { ...initialStateRedux },
    });
    const subtractFromCartButton = screen.getByTestId('subtract-from-cart-button');
    userEvent.click(subtractFromCartButton);
  });
});
