import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./Particles.css";
import Stats from "./Stats";
import { AppBarContext } from "../../../context";
import ParticlesLogic from "./ParticlesLogic";
import { IStats, defaultStats } from "./ParticleInterfaces";

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
  const [stats, setStats] = React.useState<IStats>(defaultStats);

  const onStatsChange = (stats: IStats) => {
    setStats(stats);
  };

  /**
   * Whenever we navigate to Particles project,
   * we want the navigation bar (appbar) to disappear
   */
  React.useEffect(() => {
    toggleAppBar(false);
  }, [toggleAppBar]);

  return (
    <div className={classes.root} id="particles-project">
      <div>
        <Stats handleStatsChange={onStatsChange} />
        <ParticlesLogic stats={stats} />
      </div>
    </div>
  );
};

export default Particles;
