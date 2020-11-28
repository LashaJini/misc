import React from "react";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { ParticleType } from "../ParticleInterfaces";

interface Props {
  particleType: ParticleType;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CanvasParticleType = (props: Props) => {
  const { particleType, handleChange, ...others } = props;

  return (
    <FormControl {...others}>
      <InputLabel shrink id="particle-type-label">
        Type
      </InputLabel>
      <Select
        id="particle-type-select"
        value={particleType}
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem value="circle">Circular</MenuItem>
        <MenuItem value="rect">Rectangular</MenuItem>
      </Select>
      <FormHelperText>Select Particle Type</FormHelperText>
    </FormControl>
  );
};

export default CanvasParticleType;
