import React from "react";
/* import { createMuiTheme } from "@material-ui/core/styles"; */

/* export type ThemeType = { dark: "dark" } | { light: "light" }; */
export type ThemeType = "dark" | "light";
export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};
export const themes = {
  light: "light" as ThemeType,
  dark: "dark" as ThemeType,
};

export const themeContext = {
  theme: themes.dark,
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextType>(themeContext);
