import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Projects, Settings } from "../";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fade, AppBar, Toolbar, Button, Tooltip, Box } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Routes, ComponentRoutes } from "./Routes";

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
  const toolTip = {
    enterDelay: 300,
    leaveDelay: 100,
    TransitionComponent: Fade,
    TransitionProps: { timeout: 300 },
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.nav}>
            <Tooltip title="Home" aria-label="home" {...toolTip} arrow>
              <Button component={Link} to="/">
                <HomeIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Projects" aria-label="projects" {...toolTip} arrow>
              <span>
                <Projects />
              </span>
            </Tooltip>
          </div>
          <Tooltip title="Settings" aria-label="settings" {...toolTip} arrow>
            <Box>
              <Settings />
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Switch>
        {Routes.map((component: ComponentRoutes) => (
          <Route
            key={component.name}
            exact
            path={component.path}
            render={(props) => <component.component {...props} />}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default Navigation;
