import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Home, Projects, Settings } from "../";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    nav: {
      flexGrow: 1,
    },
  })
);

const Navigation = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.nav}>
            <Button component={Link} to="/">
              Home
            </Button>
            <Button component={Link} to="/projects">
              Projects
            </Button>
          </div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/settings"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigation;
