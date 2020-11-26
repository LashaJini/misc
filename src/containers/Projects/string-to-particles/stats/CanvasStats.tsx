import React from "react";
import { useStyles } from "../StatsStyles";
import {
  CanvasParticleType,
  RectangleParams,
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
  setParticleWidth,
  setParticleHeight,
  setParticleType,
  setParticleColor,
  setCanvasScaleX,
  setCanvasScaleY,
  setCanvasStepX,
  setCanvasStepY,
} from "../../../../store/stats/actions";
import {
  ICircularParticle,
  IRectangularParticle,
  CanvasTextFieldType,
  CanvasStepType,
  /* CanvasFontType, */
  CanvasTextSizeType,
  ParticleColorType,
  ParticleRadiusType,
  ParticleWidthType,
  ParticleHeightType,
  ParticleType,
  CanvasScaleType,
} from "../../../../store/stats/types";
import {
  defaultStats,
  defaultRectangularParticle,
} from "../ParticleInterfaces";

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
    onParticleWidthChange: (width: ParticleWidthType) => {
      dispatch(setParticleWidth(width));
    },
    onParticleHeightChange: (height: ParticleHeightType) => {
      dispatch(setParticleHeight(height));
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
    onParticleTypeChange: (type: ParticleType) => {
      dispatch(setParticleType(type));
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
    particleType,
    particleT,
    /* font, */
    scale,
    step,
  } = props.stats;
  const {
    onCanvasTextChange,
    onCanvasPxChange,
    onParticleColorChange,
    onParticleRadiusChange,
    onParticleWidthChange,
    onParticleHeightChange,
    onCanvasStepYChange,
    onCanvasStepXChange,
    onCanvasScaleYChange,
    onCanvasScaleXChange,
    onParticleTypeChange,
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

  const handleParticleWidthChange = (event: Event) => {
    onParticleWidthChange(parseFloat(event.target.value));
  };

  const handleParticleHeightChange = (event: Event) => {
    onParticleHeightChange(parseFloat(event.target.value));
  };

  const handleParticleTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    /* console.log(event.target.value); */
    onParticleTypeChange(event.target.value as ParticleType);
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
          <CanvasParticleColor
            particleColor={particleT.color}
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
              inputClass={classes.input}
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
              inputClass={classes.input}
              inputProps={{ min: 1, max: 10 }}
              value={step[1]}
              startAdornment="Y:"
              handleChange={handleStepYChange}
              {...{ className: classes.formControl }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={0} xs={12} direction="column">
        <Grid>
          <CanvasParticleType
            particleType={particleType}
            handleChange={handleParticleTypeChange}
            {...{ className: classes.formControl }}
          />
        </Grid>
        <Grid>
          {particleType === "circle" ? (
            <CanvasParticleRadius
              particleRadius={(particleT as ICircularParticle).radius}
              handleParticleRadiusChange={handleParticleRadiusChange}
            />
          ) : (
            <Grid item container spacing={10}>
              <Grid item xs={2} lg={2}>
                <RectangleParams
                  inputClass={classes.input}
                  id="particleTW"
                  label="width"
                  defaultValue={defaultRectangularParticle.w}
                  value={(particleT as IRectangularParticle).w}
                  handleChange={handleParticleWidthChange}
                  {...{ className: classes.formControl }}
                />
              </Grid>
              <Grid item xs={2} lg={2}>
                <RectangleParams
                  inputClass={classes.input}
                  id="particleTH"
                  label="height"
                  defaultValue={defaultRectangularParticle.h}
                  value={(particleT as IRectangularParticle).h}
                  handleChange={handleParticleHeightChange}
                  {...{ className: classes.formControl }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connector(CanvasStats);
