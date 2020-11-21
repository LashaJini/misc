import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core/";
import { ThemeContext, ThemeType } from "../context";

type ParentThemeProps = { children: React.ReactNode };

const ParentTheme = ({ children }: ParentThemeProps) => {
  const changeTheme = (theme: ThemeType) =>
    createMuiTheme({
      palette: {
        type: theme,
      },
    });

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ThemeProvider theme={{ ...changeTheme(theme) }}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      )}
    </ThemeContext.Consumer>
  );
};

export default ParentTheme;
