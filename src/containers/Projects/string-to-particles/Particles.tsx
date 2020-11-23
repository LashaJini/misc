import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./Particles.css";
import Stats from "./Stats";
import { AppBarContext } from "../../../context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      /* position: "absolute", */
      minHeight: "100%",
    },
  })
);

const Particles = () => {
  const classes = useStyles();
  const { toggleAppBar } = React.useContext(AppBarContext);

  /**
   * Whenever we navigate to Particles project,
   * we want the navigation bar (appbar) to disappear
   */
  React.useEffect(() => {
    toggleAppBar(false);
  }, [toggleAppBar]);

  return (
    <div className={classes.root}>
      <h1>Particles</h1>
      <div>
        <Stats />
      </div>
    </div>
  );
};

export default Particles;
