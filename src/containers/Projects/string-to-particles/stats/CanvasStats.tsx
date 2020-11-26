import React from "react";
import { useStyles } from "../StatsStyles";
import {
  CanvasText,
  CanvasPx,
  CanvasParticleRadius,
  CanvasParticleColor,
  CanvasScaleInput,
  CanvasStepInput,
} from "./";
import { Typography, Grid } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../store";
import {
  setCanvasText,
  setCanvasTextSize,
  setParticleRadius,
  setParticleColor,
  setCanvasScaleX,
  setCanvasScaleY,
  setCanvasStepX,
  setCanvasStepY,
} from "../../../../store/stats/actions";
import {
  CanvasTextFieldType,
  CanvasStepType,
  /* CanvasFontType, */
  CanvasTextSizeType,
  ParticleColorType,
  ParticleRadiusType,
  CanvasScaleType,
} from "../../../../store/stats/types";
import { defaultStats } from "../ParticleInterfaces";

const mapStateToProps = (state: RootState) => {
  return {
    stats: state.canvasStats,
  };
};

/** RootDispatch */
const mapDispatchToProps = (dispatch: any) => {
  return {
    onCanvasTextChange: (text: CanvasTextFieldType) => {
      dispatch(setCanvasText(text));
    },
    onCanvasPxChange: (px: CanvasTextSizeType) => {
      dispatch(setCanvasTextSize(px));
    },
    onParticleRadiusChange: (radius: ParticleRadiusType) => {
      dispatch(setParticleRadius(radius));
    },
    onParticleColorChange: (color: ParticleColorType) => {
      dispatch(setParticleColor(color));
    },
    onCanvasScaleXChange: (scaleX: CanvasScaleType) => {
      dispatch(setCanvasScaleX(scaleX));
    },
    onCanvasScaleYChange: (scaleY: CanvasScaleType) => {
      dispatch(setCanvasScaleY(scaleY));
    },
    onCanvasStepXChange: (stepX: CanvasStepType) => {
      dispatch(setCanvasStepX(stepX));
    },
    onCanvasStepYChange: (stepY: CanvasStepType) => {
      dispatch(setCanvasStepY(stepY));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;
type Event = React.ChangeEvent<HTMLInputElement>;

const CanvasStats = (props: Props) => {
  const classes = useStyles();
  const {
    text,
    px,
    particleRadius,
    particleColor,
    /* font, */
    scale,
    step,
  } = props.stats;
  const {
    onCanvasTextChange,
    onCanvasPxChange,
    onParticleColorChange,
    onParticleRadiusChange,
    onCanvasStepYChange,
    onCanvasStepXChange,
    onCanvasScaleYChange,
    onCanvasScaleXChange,
  } = props;

  const handleCanvasTextChange = (event: Event) => {
    onCanvasTextChange(event.target.value);
  };

  const handlePxChange = (event: Event) => {
    onCanvasPxChange(parseInt(event.target.value));
  };

  const handleScaleX = (event: Event) => {
    onCanvasScaleXChange(parseInt(event.target.value));
  };

  const handleScaleY = (event: Event) => {
    onCanvasScaleYChange(parseInt(event.target.value));
  };

  const handleStepXChange = (event: Event) => {
    // [1-10]
    let val: any = parseInt(event.target.value);
    if (val < 1 || val > 10) {
      val = defaultStats.step[0];
    }
    val = val as CanvasStepType;

    onCanvasStepXChange(val);
  };

  const handleStepYChange = (event: Event) => {
    // [1-10]
    let val: any = parseInt(event.target.value);
    if (val < 1 || val > 10) {
      val = defaultStats.step[1];
    }
    val = val as CanvasStepType;

    onCanvasStepYChange(val);
  };

  const handleParticleColorChange = (event: Event) => {
    onParticleColorChange(event.target.value.trim().toLowerCase());
  };

  const handleParticleRadiusChange = (event: Event) => {
    onParticleRadiusChange(parseFloat(event.target.value));
  };

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={2}>
      <Grid item container spacing={0} alignItems="flex-end" xs={12}>
        <Grid item xs={12}>
          <CanvasText
            text={text}
            handleCanvasTextChange={handleCanvasTextChange}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={0} alignItems="flex-end" xs={12}>
        <Grid item xs={12}>
          <CanvasPx px={px} handlePxChange={handlePxChange} />
        </Grid>
      </Grid>
      <Grid item container spacing={0} alignItems="flex-end" xs={12}>
        <Grid item xs={12}>
          <CanvasParticleRadius
            particleRadius={particleRadius}
            handleParticleRadiusChange={handleParticleRadiusChange}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={0} alignItems="flex-end" xs={12}>
        <Grid item xs={12}>
          <CanvasParticleColor
            particleColor={particleColor}
            handleParticleColorChange={handleParticleColorChange}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={0} alignItems="flex-end" xs={12}>
        <Grid item container spacing={8}>
          <Grid item xs={2} lg={2}>
            <CanvasScaleInput
              inputClass={classes.scale}
              id="scaleX"
              label="x"
              value={scale[0]}
              handleChange={handleScaleX}
              {...{ className: classes.formControl }}
            />
          </Grid>
          <Grid item xs={2} lg={2}>
            <CanvasScaleInput
              inputClass={classes.scale}
              id="scaleY"
              label="y"
              value={scale[1]}
              handleChange={handleScaleY}
              {...{ className: classes.formControl }}
            />
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
          <span style={{ fontSize: "0.7rem" }}>(1 is max, 10 is min)</span>
        </Typography>
        <Grid item container spacing={10}>
          <Grid item xs={2} lg={2}>
            <CanvasStepInput
              id="stepX"
              inputClass={classes.step}
              inputProps={{ min: 1, max: 10 }}
              value={step[0]}
              startAdornment="X:"
              handleChange={handleStepXChange}
              {...{ className: classes.formControl }}
            />
          </Grid>
          <Grid item xs={2} lg={2}>
            <CanvasStepInput
              id="stepY"
              inputClass={classes.step}
              inputProps={{ min: 1, max: 10 }}
              value={step[1]}
              startAdornment="Y:"
              handleChange={handleStepYChange}
              {...{ className: classes.formControl }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connector(CanvasStats);
