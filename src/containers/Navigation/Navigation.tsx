import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FolderIcon from "@material-ui/icons/Folder";
import SettingsIcon from "@material-ui/icons/Settings";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Settings, Projects } from "../";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    nav: {
      flexGrow: 1,
    },
  })
);

const Navigation = () => {
  const classes = useStyles();
  return (
    <>
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                className={classes.nav}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/projects"
                startIcon={<FolderIcon />}
                className={classes.nav}
              >
                Projects
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                <SettingsIcon />
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Navigation;
