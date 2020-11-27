import React from "react";
import { useStyles } from "../StatsStyles";
import { Grid } from "@material-ui/core";
import { TriangleParams, RectangleParams, CanvasParticleRadius } from "./";
import {
  defaultRectangularParticle,
  defaultTriangularParticle,
} from "../ParticleInterfaces";
import { ICircularParticle } from "../../../../store/stats/types";

function ParticleAdditionalParams(props: any) {
  const classes = useStyles();
  const {
    particleT,
    particleType,
    handleParticleRadiusChange,
    handleParticleWidthChange,
    handleParticleHeightChange,
    handleParticleAChange,
    handleParticleBChange,
    handleParticleCChange,
  } = props;
  if (particleType === "circle") {
    return (
      <CanvasParticleRadius
        particleRadius={(particleT as ICircularParticle).radius}
        handleParticleRadiusChange={handleParticleRadiusChange}
      />
    );
  } else if (particleType === "rect") {
    return (
      <Grid item container spacing={10}>
        <Grid item xs={2} lg={2}>
          <RectangleParams
            inputClass={classes.input}
            id="particleTW"
            label="width"
            defaultValue={defaultRectangularParticle.w}
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
            handleChange={handleParticleHeightChange}
            {...{ className: classes.formControl }}
          />
        </Grid>
      </Grid>
    );
  } else if (false) {
    return (
      <Grid item container spacing={10}>
        <Grid item xs={2} lg={2}>
          <TriangleParams
            inputClass={classes.input}
            id="particleTA"
            label="a"
            defaultValue={defaultTriangularParticle.a}
            handleChange={handleParticleAChange}
            {...{ className: classes.formControl }}
          />
        </Grid>
        <Grid item xs={2} lg={2}>
          <TriangleParams
            inputClass={classes.input}
            id="particleTB"
            label="b"
            defaultValue={defaultTriangularParticle.b}
            handleChange={handleParticleBChange}
            {...{ className: classes.formControl }}
          />
        </Grid>
        <Grid item xs={2} lg={2}>
          <TriangleParams
            inputClass={classes.input}
            id="particleTB"
            label="b"
            defaultValue={defaultTriangularParticle.c}
            handleChange={handleParticleCChange}
            {...{ className: classes.formControl }}
          />
        </Grid>
      </Grid>
    );
  }
  return <></>;
}

export default ParticleAdditionalParams;
