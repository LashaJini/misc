import React from "react";
import {
  Button,
  Typography,
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
import { IStats, defaultStats } from "./ParticleInterfaces";

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
    "&:click": {},
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
    messedUp: {
      fontSize: "0.6rem",
      textDecoration: "underline",
    },
  })
);

const buttonStyle = {
  variant: "contained" as "contained",
  color: "primary" as "primary",
};

/* const items = []; */

interface Props {
  handleStatsChange: (stats: IStats) => void;
}

const Stats = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { toggleAppBar } = React.useContext(AppBarContext);
  const { handleStatsChange } = props;
  const [text, setText] = React.useState<string>(defaultStats.text);
  const [particleColor, setParticleColor] = React.useState<string>(
    defaultStats.particleColor
  );
  const [px, setPx] = React.useState<number>(defaultStats.px);
  const [particleRadius, setParticleRadius] = React.useState<number>(
    defaultStats.particleRadius
  );

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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleParticleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticleColor(event.target.value.trim().toLowerCase());
  };

  const handlePxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPx(Number(event.target.value));
  };

  const handleParticleRadiusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticleRadius(Number(event.target.value));
  };

  const updateStats = () => {
    const stats: IStats = {
      ...defaultStats,
      text: text,
      px: px,
      particleRadius: particleRadius,
      particleColor: particleColor,
    };
    handleStatsChange(stats);
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
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <FiberManualRecordIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="text"
                    label="Text"
                    defaultValue={defaultStats.text}
                    type="text"
                    onChange={handleTextChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <FiberManualRecordIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="px"
                    label="Text Size"
                    defaultValue={defaultStats.px}
                    type="number"
                    onChange={handlePxChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <FiberManualRecordIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="particleRadius"
                    label="Particle Radius"
                    defaultValue={defaultStats.particleRadius}
                    type="number"
                    onChange={handleParticleRadiusChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <FiberManualRecordIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="particleColor"
                    label="Particle Color"
                    defaultValue={defaultStats.particleColor}
                    type="text"
                    onChange={handleParticleColorChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledMenuItem>
        <StyledMenuItem>
          <Typography
            className={classes.messedUp}
            onClick={() => handleStatsChange(defaultStats)}
          >
            Hehe, I Messed up... Defaults Please!
          </Typography>
        </StyledMenuItem>
        <StyledMenuItem>
          <Button {...buttonStyle} onClick={updateStats} color="secondary">
            <Typography>Generate Particles</Typography>
          </Button>
        </StyledMenuItem>
        <StyledMenuItem>
          <Button
            {...buttonStyle}
            component={Link}
            to="/"
            onClick={() => toggleAppBar(true)}
          >
            <Typography>Home</Typography>
          </Button>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default Stats;
