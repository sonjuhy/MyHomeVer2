import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import { useMediaQuery } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "@/theme";

import Header from '../../components/head';

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return <div>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme(prefersDarkMode)}>
        <CssBaseline />
        <Header></Header>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppRouterCacheProvider>
  </div>
}
