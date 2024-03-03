import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";

import Header from "../../components/head";
import { PortfolioProvider } from "../../context/context";
import { prefix } from "../../config/config";
import { Providers } from "../../context/redux/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  const contextValue = { prefix: prefix };
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <Providers>
      <div id="main_index_container" style={{ height: "100%" }}>
        <PortfolioProvider value={contextValue}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme(prefersDarkMode)}>
              <CssBaseline />
              <Header></Header>
              <Component {...pageProps} />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </PortfolioProvider>
      </div>
    </Providers>
  );
}
