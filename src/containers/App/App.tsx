import React from "react";
import "./App.css";
import { Navigation } from "../";
import ParentTheme from "../../themes/ParentTheme";
import { useMediaQuery } from "@material-ui/core";
import { ThemeContext, ThemeContextType, ThemeType } from "../../context";

/**
 * @author 109149
 * @time Sat 28 Nov 2020 23:04:34 +04
 *
 * Feel free to check the code, but please do not write as I did. I made a lot
 * mistakes, there are also bugs and some performance issue.
 */

function App() {
  const prefersDarkMode = useMediaQuery("prefers-color-scheme: dark");
  const [theme, setTheme] = React.useState<ThemeType>(
    localStorage.getItem("theme") === "dark" || prefersDarkMode
      ? "dark"
      : "light"
  );

  const onThemeChange = () => {
    let newTheme: ThemeType = "dark";
    if (theme === "dark") {
      newTheme = "light";
    }

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const themeContext: ThemeContextType = {
    theme: theme,
    toggleTheme: onThemeChange,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      <ParentTheme>
        <Navigation />
      </ParentTheme>
    </ThemeContext.Provider>
  );
}

export default App;
