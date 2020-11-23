import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  Fab,
  Zoom,
  Grid,
  TextField,
} from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
/* import { red, green, orange } from "@material-ui/core/colors"; */
import AddCirleIcon from "@material-ui/icons/AddCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
import { AppBarContext } from "../../../context";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    /* getContentAnchorEl={null} */
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    /* "&:focus": { */
    /*   backgroundColor: theme.palette.primary.main, */
    /*   "& .MuiListItemIcon-root. & .MuiListItemText-primary": { */
    /*     color: theme.palette.common.white, */
    /*   }, */
    /* }, */
  },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      "&:click": {
        backgroundColor: theme.palette.common.white,
      },
    },
  })
);

/* const items = []; */

const Stats = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [numberOfParticles, setNumberOfParticles] = React.useState<number>(100);
  const { toggleAppBar } = React.useContext(AppBarContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const fab = {
    color: "primary" as "primary",
    className: classes.fab,
    icon: <AddCirleIcon color="secondary" fontSize="large" />,
    label: "Expand",
    /* size: "medium" as "medium", */
    key: "particlesFab",
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleParticleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfParticles(Number(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item># of Particles: {numberOfParticles}</Grid>
      </Grid>
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
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <FiberManualRecordIcon />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="# of Particles"
                type="number"
                onChange={handleParticleNumberChange}
              />
            </Grid>
          </Grid>
        </StyledMenuItem>
        <Button component={Link} to="/" onClick={() => toggleAppBar(true)}>
          <StyledMenuItem>Home</StyledMenuItem>
        </Button>
      </StyledMenu>
    </div>
  );
};

export default Stats;
