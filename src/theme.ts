'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    wnb: true;
  }
  interface AppBarPropsColorOverrides {
    wnb: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    wnb: Palette['primary'];
  }

  interface PaletteOptions {
    wnb?: PaletteOptions['primary'];
  }
}

const theme = (prefersDarkMode:any) => {
  return useMemo(() => {
    return createTheme({
      typography: {
        fontFamily: roboto.style.fontFamily,
      },
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        wnb: {
          main: '#ffffff',
          light: '#E9DB5D',
          dark: '#A29415',
          contrastText: '#000000', 
        } as any,
      },
    });
  }, [prefersDarkMode]);
};

export default theme;
