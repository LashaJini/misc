import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";

interface Props {
  id: string;
  label: string;
  defaultValue: number | undefined;
  handleChange: (event: any) => void;
  inputClass: string;
}

const TriangleParams = (props: Props) => {
  const {
    id,
    label,
    defaultValue,
    handleChange,
    inputClass,
    ...others
  } = props;

  return (
    <FormControl size="small" {...others}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type="number"
        defaultValue={defaultValue}
        className={inputClass}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default TriangleParams;
