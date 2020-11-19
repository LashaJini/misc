import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core/";

const theme = createMuiTheme({});

interface Props {
  children?: React.ReactNode;
}

const ParentTheme = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default ParentTheme;
