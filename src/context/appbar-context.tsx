import React from "react";

export type EnabledAppBarType = {
  enabled: boolean;
  toggleAppBar: (b: boolean) => void;
};

export const appBarContext: EnabledAppBarType = {
  enabled: true,
  toggleAppBar: () => {},
};

export const AppBarContext = React.createContext<EnabledAppBarType>(
  appBarContext
);
