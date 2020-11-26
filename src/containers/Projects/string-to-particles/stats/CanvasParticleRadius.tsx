import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  particleRadius: number | undefined;
  handleParticleRadiusChange: (event: any) => void;
}

const CanvasParticleRadius = (props: Props) => {
  const { particleRadius, handleParticleRadiusChange } = props;

  return (
    <TextField
      id="particleRadius"
      label="Particle Radius"
      value={particleRadius}
      type="number"
      onChange={handleParticleRadiusChange}
      fullWidth
    />
  );
};

export default CanvasParticleRadius;
