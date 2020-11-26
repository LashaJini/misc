import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

interface Props {
  id: string;
  label: string;
  value: number | undefined;
  handleChange: (event: any) => void;
  inputClass: string;
}

const CanvasScaleInput = (props: Props) => {
  const { id, label, value, handleChange, inputClass, ...others } = props;

  return (
    <FormControl size="small" {...others}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type="number"
        value={value}
        className={inputClass}
        onChange={handleChange}
      />
      <FormHelperText>Scale</FormHelperText>
    </FormControl>
  );
};

export default CanvasScaleInput;
