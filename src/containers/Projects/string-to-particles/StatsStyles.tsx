import React from "react";
import {
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { MenuProps } from "@material-ui/core/Menu";
import { Menu, MenuItem } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      "&:click": {
        backgroundColor: theme.palette.common.white,
      },
    },
    messedUp: {
      fontSize: "0.6rem",
      textDecoration: "underline",
      cursor: "pointer",
    },
    scale: {
      width: "2em",
    },
    formControl: {
      /* width: "25%", */
    },
    input: {
      width: "4em",
    },
    sep: {
      marginTop: theme.spacing(2),
    },
  })
);

export const buttonStyle = {
  variant: "contained" as "contained",
  color: "primary" as "primary",
};

export const StyledMenu = withStyles((theme: Theme) => ({
  paper: {
    border: "1px solid #d3d4d5",
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    autoFocus={false}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      cursor: "default",
    },
  },
}))((props: any) => <MenuItem disableRipple={true} {...props} />); // :/ any
