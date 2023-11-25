import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../hooks/redux-hooks';
import { searchProductList, startLoading } from '../store/product/productSlice';

function SearchBar() {
  const dispatch = useAppDispatch();

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(setTimeout(() => {}));

  const handleSearch = (value: string) => {
    dispatch(startLoading());

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      dispatch(searchProductList(value));
    }, 500);

    setTimer(newTimer);
  };

  return (
    <Box className="search-input-wrapper">
      <SearchIcon htmlColor="gray" />
      <TextField
        // data-testid="search-input"
        inputProps={{ 'data-testid': 'search-input' }}
        className="search-input"
        placeholder="Searching for..."
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Box className="search-button">
        <Typography className="search-button-text">Search</Typography>
      </Box>
    </Box>
  );
}

export default SearchBar;
