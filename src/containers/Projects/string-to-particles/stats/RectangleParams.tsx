import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";

interface Props {
  id: string;
  label: string;
  value: number | undefined;
  defaultValue: number | undefined;
  handleChange: (event: any) => void;
  inputClass: string;
}

const RectangleParams = (props: Props) => {
  const {
    id,
    label,
    value,
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
        value={value}
        defaultValue={defaultValue}
        className={inputClass}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default RectangleParams;
