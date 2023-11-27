import { api } from './api';

const products = () => {
  return api({
    url: '/products',
    method: 'GET',
  });
};

const searchProduct = (value: string) => {
  return api({
    url: `/search?name=${value}`,
    method: 'GET',
  });
};

const addToCart = (value: string) => {
  return api({
    url: `/add-to-cart?id=${value}`,
    method: 'POST',
  });
};

const subtractFromCart = (value: string) => {
  return api({
    url: `/subtract-from-cart?id=${value}`,
    method: 'POST',
  });
};

const viewCart = () => {
  return api({
    url: `/view-cart`,
    method: 'GET',
  });
};

const productServices = {
  products,
  searchProduct,
  addToCart,
  subtractFromCart,
  viewCart,
};

export default productServices;
