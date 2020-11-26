import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  text: string;
  handleCanvasTextChange: (event: any) => void;
}

const CanvasText = (props: Props) => {
  const { text, handleCanvasTextChange } = props;

  return (
    <TextField
      id="text"
      variant="outlined"
      label="Text"
      value={text}
      type="text"
      onChange={handleCanvasTextChange}
      fullWidth
    />
  );
};

export default CanvasText;
