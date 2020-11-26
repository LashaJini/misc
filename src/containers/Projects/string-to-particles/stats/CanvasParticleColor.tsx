import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  particleColor: string;
  handleParticleColorChange: (event: any) => void;
}

const CanvasParticleColor = (props: Props) => {
  const { particleColor, handleParticleColorChange } = props;
  return (
    <TextField
      id="particleColor"
      helperText="pick a color"
      value={particleColor}
      type="color"
      onChange={handleParticleColorChange}
      fullWidth
    />
  );
};

export default CanvasParticleColor;
