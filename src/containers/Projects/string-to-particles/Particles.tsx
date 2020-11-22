import React from "react";
import { Fab, Zoom } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { green } from "@material-ui/core/colors";
import "./Particles.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      /* backgroundColor: theme.palette.background.paper, */
      width: "100%",
      /* position: "relative", */
      minHeight: "100%",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[600],
      },
    },
  })
);

const Particles = () => {
  const classes = useStyles();
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fab = {
    color: "primary" as "primary",
    className: classes.fab,
    icon: <UpIcon />,
    label: "Expand",
  };

  return (
    <>
      <h1>Particles</h1>
      <div className={classes.root}>
        <Zoom
          key={fab.color}
          in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${transitionDuration.exit}ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      </div>
    </>
  );
};

export default Particles;
