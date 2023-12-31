import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getProductList, startLoading } from '../store/product/productSlice';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import BetaLogo from '../assets/images/beta-logo.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { ToastContainer } from 'react-toastify';

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1.5,
        swipeToSlide: true,
      },
    },
    {
      breakpoint: 496,
      settings: {
        slidesToShow: 1.1,
        swipeToSlide: true,
      },
    },
    {
      breakpoint: 376,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function ProductList() {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state?.product);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getProductList());
  }, [dispatch]);
  return (
    <>
      <div className="header">
        <img className="logo" src={BetaLogo} alt="" />
        <SearchBar />
        <Box />
      </div>
      {isLoading ? (
        <Box className="loading-box">
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Slider className="slide-item" {...settings}>
            {products.length > 0 ? (
              products?.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  discount={item.discount}
                  image={item.image}
                  name={item.name}
                  rating={item.rating}
                  price={item.price}
                  originalPrice={item.originalPrice}
                />
              ))
            ) : (
              <Typography className="no-record">There is no record</Typography>
            )}
          </Slider>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

export default ProductList;
