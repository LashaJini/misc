import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
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
import AddCirleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import { AppBarContext } from "../../../context";
import { IStats, defaultStats, StepType } from "./ParticleInterfaces";

const StyledMenu = withStyles((theme: Theme) => ({
  paper: {
    border: "1px solid #d3d4d5",
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    autoFocus={false}
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
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      cursor: "default",
    },
  },
}))((props: any) => <MenuItem disableRipple={true} {...props} />); // :/ any

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
      cursor: "pointer",
    },
    scale: {
      width: "2em",
    },
    formControl: {
      /* width: "25%", */
    },
    step: {
      width: "4em",
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
  const [px, setPx] = React.useState<number | undefined>(defaultStats.px);
  const [scaleX, setScaleX] = React.useState<number | undefined>(
    defaultStats.scale[0]
  );
  const [scaleY, setScaleY] = React.useState<number | undefined>(
    defaultStats.scale[1]
  );
  const [stepX, setStepX] = React.useState<StepType>(defaultStats.step[0]);
  const [stepY, setStepY] = React.useState<StepType>(defaultStats.step[1]);
  const [particleRadius, setParticleRadius] = React.useState<
    number | undefined
  >(defaultStats.particleRadius);
  const [particleColor, setParticleColor] = React.useState<string>(
    defaultStats.particleColor
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    /* console.log("in text change", text); */
  };

  const handleScaleX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScaleX(parseInt(event.target.value));
  };

  const handleScaleY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScaleY(parseInt(event.target.value));
  };

  const handleStepXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // [1-10]
    let val: any = parseInt(event.target.value);
    if (val < 1 || val > 10) {
      val = defaultStats.step[0];
    }
    val = val as StepType;

    setStepX(val);
  };

  const handleStepYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // [1-10]
    let val: any = parseInt(event.target.value);
    if (val < 1 || val > 10) {
      val = defaultStats.step[1];
    }
    val = val as StepType;

    setStepY(val);
  };

  const handleParticleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticleColor(event.target.value.trim().toLowerCase());
  };

  const handlePxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPx(parseInt(event.target.value));
  };

  const handleParticleRadiusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticleRadius(parseFloat(event.target.value));
  };

  const resetToDefaultStats = () => {
    setParticleRadius(defaultStats.particleRadius);
    setPx(defaultStats.px);
    setParticleColor(defaultStats.particleColor);
    setText(defaultStats.text);
    setScaleX(defaultStats.scale[0]);
    setScaleY(defaultStats.scale[1]);
    setStepX(defaultStats.step[0]);
    setStepY(defaultStats.step[1]);
    handleStatsChange(defaultStats);
  };

  const updateStats = () => {
    const stats: IStats = {
      ...defaultStats,
      text: text,
      px: px,
      particleRadius: particleRadius,
      particleColor: particleColor,
      scale: [scaleX, scaleY],
      step: [stepX, stepY],
    };
    /* console.log("in update stats", stats); */
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
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item container spacing={0} alignItems="flex-end" xs={12}>
              <Grid item xs={12}>
                <TextField
                  id="text"
                  variant="outlined"
                  label="Text"
                  value={text}
                  type="text"
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container spacing={0} alignItems="flex-end" xs={12}>
              <Grid item xs={12}>
                <TextField
                  id="px"
                  label="Text Size"
                  value={px}
                  type="number"
                  onChange={handlePxChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container spacing={0} alignItems="flex-end" xs={12}>
              <Grid item xs={12}>
                <TextField
                  id="particleRadius"
                  label="Particle Radius"
                  value={particleRadius}
                  type="number"
                  onChange={handleParticleRadiusChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container spacing={0} alignItems="flex-end" xs={12}>
              <Grid item xs={12}>
                <TextField
                  id="particleColor"
                  helperText="pick a color"
                  value={particleColor}
                  type="color"
                  onChange={handleParticleColorChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container spacing={0} alignItems="flex-end" xs={12}>
              <Grid item container spacing={8}>
                <Grid item xs={2} lg={2}>
                  <FormControl className={classes.formControl} size="small">
                    <InputLabel htmlFor="scaleX">x</InputLabel>
                    <Input
                      id="scaleX"
                      type="number"
                      value={scaleX}
                      className={classes.scale}
                      onChange={handleScaleX}
                    />
                    <FormHelperText>Scale</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={2} lg={2}>
                  <FormControl className={classes.formControl} size="small">
                    <InputLabel htmlFor="scaleY">y</InputLabel>
                    <Input
                      id="scaleY"
                      type="number"
                      className={classes.scale}
                      value={scaleY}
                      onChange={handleScaleY}
                    />
                    <FormHelperText>Scale</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={0} alignItems="flex-end" xs={12}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "0.9rem" }}
                className={classes.scale}
              >
                Change # Of Particles On:
                <br />
                <span style={{ fontSize: "0.7rem" }}>
                  (1 is max, 10 is min)
                </span>
              </Typography>
              <Grid item container spacing={10}>
                <Grid item xs={2} lg={2}>
                  <FormControl className={classes.formControl}>
                    <Input
                      id="stepX"
                      type="number"
                      className={classes.step}
                      inputProps={{ min: 1, max: 10 }}
                      value={stepX}
                      startAdornment="X:"
                      onChange={handleStepXChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} lg={2}>
                  <FormControl className={classes.formControl}>
                    <Input
                      id="stepY"
                      type="number"
                      className={classes.step}
                      inputProps={{ min: 1, max: 10 }}
                      value={stepY}
                      startAdornment="Y:"
                      onChange={handleStepYChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledMenuItem>
        <br />
        <StyledMenuItem>
          <Typography
            className={classes.messedUp}
            onClick={resetToDefaultStats}
          >
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

export default Stats;
