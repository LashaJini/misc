import React from "react";
import DarkMode from "./DarkMode";
import { Typography } from "@material-ui/core";

const Settings = () => {
  return (
    <>
      <Typography variant="h4">Settings</Typography>
      <DarkMode />
    </>
  );
};

export default Settings;
