import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  px: number | undefined;
  handlePxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CanvasPx = (props: Props) => {
  const { px, handlePxChange } = props;

  return (
    <TextField
      id="px"
      label="Text Size"
      value={px}
      type="number"
      onChange={handlePxChange}
      fullWidth
    />
  );
};

export default CanvasPx;
