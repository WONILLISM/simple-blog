import React, { ReactNode, useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";

interface ThemeConfigProps {
  children: ReactNode;
}

const ThemeConfig = ({ children }: ThemeConfigProps) => {
  // MUI 초기 theme 값
  const defaultTheme = createTheme();
  // 수정될 theme 값
  const themeOptions: ThemeOptions = useMemo<ThemeOptions>(
    () => ({
      palette: {
        // primary: {
        //   light: "#0092FF",
        //   main: "#5586FD",
        //   dark: "#53648E",
        //   contrastText: "#FFFFFF",
        // },
        // secondary: {},
        // error: {},
        // warning: {},
        // info: {},
        // success: {},
      },
      typography: {
        // fontFamily: "Noto Sans",
        // h1: {
        //   fontWeight: 900,
        //   fontSize: "60px",
        //   letterSpacing: "-0.02em",
        // },
        // h2: {},
      },
      // spacing: {},
      breakpoints: {
        // values: {
        //   xs: 0,
        //   sm: 600,
        //   md: 900,
        //   lg: 1024,
        //   xl: 1440,
        // },
      },
      // zIndex: {},
      // transitions: {},
      // components: {},
    }),
    []
  );
  // 수정된 theme 적용
  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
