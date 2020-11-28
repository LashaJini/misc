import Particles from "./string-to-particles/Particles";
import Playground from "./playground/Playground";
import { root } from "../../ohboi";

type ProjectTypes = {
  projectName: string;
  path: string;
  component?: any; // I don't like this
};

const devProjects: Array<ProjectTypes> =
  process.env.NODE !== "production"
    ? [
        {
          projectName: "Playground",
          path: `${root}/projects/playground`,
          component: Playground,
        },
      ]
    : [];

export const projectNames: Array<ProjectTypes> = [
  ...devProjects,
  {
    projectName: "To Particles",
    path: `${root}/projects/to-particles`,
    component: Particles,
  },
];

export { Particles, Playground };
