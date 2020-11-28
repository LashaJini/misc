import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  color: string;
  id: string;
  handleColorChange: (event: any) => void;
}

const CanvasColor = (props: Props) => {
  const { id, color, handleColorChange } = props;
  return (
    <TextField
      id={id}
      helperText="pick a color"
      value={color}
      type="color"
      onChange={handleColorChange}
      fullWidth
    />
  );
};

export default CanvasColor;
