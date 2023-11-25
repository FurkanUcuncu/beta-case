import { Suspense, useEffect } from 'react';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './hooks/redux-hooks';
import { CircularProgress } from '@mui/material';
import ProductList from './pages/ProductList';
import { getSessionId } from './store/auth/authSlice';
import { viewCart } from './store/product/productSlice';
import Layout from './components/Layout';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSessionId()).then(() => dispatch(viewCart()));
  }, [dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <Layout>
        <ProductList />
      </Layout>
    </Suspense>
  );
};

export default App;
