import React from "react";
import { FormControl, Input } from "@material-ui/core";

interface Props {
  id: string;
  inputClass: string;
  inputProps: object;
  value: number | undefined;
  startAdornment: string;
  handleChange: (event: any) => void;
}

const CanvasStepInput = (props: Props) => {
  const {
    id,
    inputClass,
    inputProps,
    value,
    startAdornment,
    handleChange,
    ...others
  } = props;

  return (
    <FormControl {...others}>
      <Input
        id={id}
        type="number"
        className={inputClass}
        inputProps={inputProps}
        value={value}
        startAdornment={startAdornment}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default CanvasStepInput;
