import React from 'react';
import { Box, Button, Grid, Paper, Typography, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { addToCart, subtractFromCart, viewCart } from '../store/product/productSlice';
import { currencyFormatter } from '../utils/utils';
import { toast } from 'react-toastify';

const ProductCard = ({
  id,
  discount,
  image,
  name,
  rating,
  price,
  originalPrice,
}: {
  id: string;
  discount: string;
  image: string;
  name: string;
  rating: number;
  price: number;
  originalPrice: number;
}) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state?.product);

  const handleToast = (status: 'added' | 'subtracted') => {
    toast.success(`Item ${status === 'added' ? 'added to' : 'subtracted from'} cart`);
  };

  const handleAddToCart = (id: string) => {
    dispatch(addToCart(id)).then(() => {
      dispatch(viewCart());
      handleToast('added');
    });
  };
  const handleSubtractFromCart = (id: string) => {
    dispatch(subtractFromCart(id)).then(() => {
      dispatch(viewCart());
      handleToast('subtracted');
    });
  };
  const getQuantity = () => {
    return cart?.filter((item) => item.productId === id)[0]?.quantity;
  };

  return (
    <Zoom in>
      <Grid item xs={12} md={4} p={1}>
        <Paper className="card-item-wrapper">
          <Box className="discount-rate">
            <Typography className="item-discount">{discount}</Typography>
          </Box>
          <img className="card-image" src={image} alt={name} />
          <Box p={4} className="card-bottom">
            <Box className="card-info">
              <Typography className="product-name">{name}</Typography>
              <Box className="rating-box">
                {[...new Array(5)].map((_, index) => {
                  return index < rating ? (
                    <StarIcon key={index} fontSize="small" htmlColor="#f5c518" />
                  ) : (
                    <StarBorderIcon key={index} fontSize="small" htmlColor="#80808094" />
                  );
                })}
                <Typography className="rating-text">({rating})</Typography>
              </Box>
              <Box className="price-row">
                <Typography className="price">{currencyFormatter.format(price)}</Typography>
                <Typography className="original-price">
                  {currencyFormatter.format(originalPrice)}
                </Typography>
              </Box>
            </Box>
            <Box className="card-buttons">
              {getQuantity() > 0 && (
                <>
                  <Button
                    data-testid="subtract-from-cart-button"
                    onClick={() => handleSubtractFromCart(id)}
                    className="card-button"
                  >
                    <RemoveIcon htmlColor="rgb(198 55 55)" />
                  </Button>
                  <Typography className="quantity">{getQuantity()}</Typography>
                </>
              )}

              <Button
                data-testid="add-to-cart-button"
                onClick={() => handleAddToCart(id)}
                className="card-button"
              >
                <AddIcon htmlColor="rgb(198 55 55)" />
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Zoom>
  );
};

export default ProductCard;
