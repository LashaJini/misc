import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Typography,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";
import { projectNames } from "./";

const useStyles = makeStyles({
  list: {
    width: 160,
  },
  fullList: {
    width: "auto",
  },
  listItemStyle: {
    textDecoration: "none",
    color: "inherit",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

const Projects = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const drawer = "left";

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {projectNames.map((project) => (
          <ListItem
            component={Link}
            to={project.path}
            key={project.projectName}
            color="inherit"
            className={classes.listItemStyle}
          >
            <Typography variant="h6">
              <ListItemText primary={project.projectName} />
            </Typography>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer(drawer, true)}
        aria-controls="projects-menu"
        aria-haspopup="true"
      >
        <FolderIcon />
      </Button>
      <Drawer
        anchor={drawer}
        open={state[drawer]}
        onClose={toggleDrawer(drawer, false)}
      >
        {list(drawer)}
      </Drawer>
    </>
  );
};

export default Projects;
