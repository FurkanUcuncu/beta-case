import React, { Suspense } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CircularProgress } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import { ReduxWrapper } from '../../components/ReduxWrapper';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

describe('SearchBar component Test', () => {
  it('SearchBar render', () => {
    render(
      <Suspense fallback={<CircularProgress />}>
        <SearchBar />
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
  it('User searchs for a product', () => {
    jest.useFakeTimers();
    render(
      <Suspense fallback={<CircularProgress />}>
        <SearchBar />
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'a' } });
    jest.runAllTimers();
  });
});
