import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

const theme = createTheme({
  typography: {
    fontFamily: ["'Open Sans', sans-serif"].join(','),
  },
});

function Layout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Layout;
