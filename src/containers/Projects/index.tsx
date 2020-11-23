import Particles from "./string-to-particles/Particles";
import Playground from "./playground/Playground";

type ProjectTypes = {
  projectName: string;
  path: string;
  component?: any; // I don't like this
};

export const projectNames: Array<ProjectTypes> = [
  {
    projectName: "To Particles",
    path: "/projects/to-particles",
    component: Particles,
  },
  {
    projectName: "Playground",
    path: "/projects/playground",
    component: Playground,
  },
];

export { Particles, Playground };
