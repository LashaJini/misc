import React from "react";
// WARNING: In order to this routing staff to work
// you must import DEFAULT components
import Home from "../Home/Home";
import PageDoesNotExist from "../../components/PageDoesNotExist";

import { projectNames } from "../Projects";

export type ComponentRoutes = {
  name: string;
  path: string;
  component: any; // I don't like this
  /* component: React.ReactElement; */
  icon?: React.ReactNode;
};

const projectRoutes: Array<ComponentRoutes> = projectNames.map((project) => {
  const result: ComponentRoutes = {
    ...project,
    name: project.projectName,
    component: project.component || "div",
  };

  return result;
});

export const Routes: Array<ComponentRoutes> = [
  ...projectRoutes,
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "404",
    path: "*",
    component: PageDoesNotExist,
  },
];
