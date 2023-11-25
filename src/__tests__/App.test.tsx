import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { CircularProgress } from '@mui/material';
import { ReduxWrapper } from '../components/ReduxWrapper';

jest.mock('axios', () => ({
  create: jest.fn(),
  config: {
    paramsSerializer: jest.fn(),
  },
}));

jest.mock('react-slick', () => jest.fn());

test('renders learn react link', async () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  render(
    <Suspense fallback={<CircularProgress />}>
      <App />
    </Suspense>,
    { wrapper: ReduxWrapper },
  );
});
