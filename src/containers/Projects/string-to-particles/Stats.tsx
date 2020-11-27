import React from "react";
import CanvasStats from "./stats/CanvasStats";
import {
  useStyles,
  buttonStyle,
  StyledMenu,
  StyledMenuItem,
} from "./StatsStyles";
import { Button, Typography, Fab, Zoom } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AddCirleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import { AppBarContext } from "../../../context";
import { defaultStats } from "./ParticleInterfaces";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";

import { resetStats } from "../../../store/stats/actions";
import {
  IStats,
  ICircularParticle,
  IRectangularParticle,
  ITriangularParticle,
} from "../../../store/stats/types";

const mapStateToProps = (state: RootState) => {
  return {
    stats: state.canvasStats,
  };
};

/** RootDispatch */
const mapDispatchToProps = (dispatch: any) => {
  return {
    onStatsReset: (stats: IStats) => {
      dispatch(resetStats(stats));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

/* const items = []; */

interface IProps extends Props {
  handleStatsChange: (stats: IStats) => void;
}

const Stats = (props: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { toggleAppBar } = React.useContext(AppBarContext);
  const { handleStatsChange, stats, onStatsReset } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // styled fab
  const fab = {
    color: "primary" as "primary",
    className: classes.fab,
    icon: <AddCirleIcon color="secondary" fontSize="large" />,
    label: "Expand",
    key: "particlesFab",
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const resetToDefaultStats = () => {
    onStatsReset(defaultStats);
    handleStatsChange(defaultStats);
  };

  const updateStats = () => {
    const res: IStats = {
      ...defaultStats,
      text: stats.text,
      px: stats.px,
      particleType: stats.particleType,
      scale: stats.scale,
      step: stats.step,
      particleT: {
        ...stats.particleT,
        radius: (stats.particleT as ICircularParticle).radius,
        w: (stats.particleT as IRectangularParticle).w,
        h: (stats.particleT as IRectangularParticle).h,
        a: (stats.particleT as ITriangularParticle).a,
        b: (stats.particleT as ITriangularParticle).b,
        c: (stats.particleT as ITriangularParticle).c,
        movementType: { ...stats.particleT.movementType },
        color: stats.particleT.color,
      },
    };
    /* console.log("in update stats", stats); */
    handleStatsChange(res);
  };

  return (
    <div className={classes.root}>
      <Zoom
        key={fab.key}
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab
          aria-controls="customized-menu"
          aria-haspopup="true"
          color={fab.color}
          className={fab.className}
          onClick={handleClick}
          {...fab}
        >
          {fab.icon}
        </Fab>
      </Zoom>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <StyledMenuItem>
          <CanvasStats />
        </StyledMenuItem>
        <br />
        <StyledMenuItem disableRipple={false} onClick={resetToDefaultStats}>
          <Typography className={classes.messedUp}>
            Hehe, I Messed Up... Defaults Please!
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem>
          <Button {...buttonStyle} onClick={updateStats} color="secondary">
            Generate Particles
          </Button>
        </StyledMenuItem>
        <StyledMenuItem>
          <Button
            {...buttonStyle}
            component={Link}
            to="/"
            onClick={() => toggleAppBar(true)}
          >
            Home
          </Button>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default connector(Stats);
