import React from "react";
// WARNING: In order to this routing staff to work
// you must import DEFAULT components
import Particles from "../Projects/string-to-particles/Particles";
import Home from "../Home/Home";

export type ComponentRoutes = {
  name: string;
  path: string;
  component: any;
  icon?: React.ReactNode;
};

// TODO: Project Routes -> here
export const Routes: Array<ComponentRoutes> = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "To Particles",
    path: "/projects/to-particles",
    component: Particles,
  },
];
