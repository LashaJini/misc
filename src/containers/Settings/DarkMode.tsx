import React from "react";
import {
  Container,
  FormLabel,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { ThemeContext } from "../../context";

const DarkMode = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <Container>
          <FormLabel>Dark Mode: </FormLabel>
          <FormControlLabel
            checked={theme === "light" ? false : true}
            label={
              theme === "light" ? <Brightness7Icon /> : <Brightness4Icon />
            }
            control={<Switch onChange={toggleTheme} />}
          />
        </Container>
      )}
    </ThemeContext.Consumer>
  );
};

export default DarkMode;
