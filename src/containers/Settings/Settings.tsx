import React from "react";
import DarkMode from "./DarkMode";
import {
  Divider,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const Settings = () => {
  const [anchorElem, setAnchorElem] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElem(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElem(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorElem}
        open={Boolean(anchorElem)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem>
          <Typography variant="h6">Settings</Typography>
        </MenuItem>
        <Divider variant="middle" />
        <DarkMode />
      </Menu>
    </>
  );
};

export default Settings;
