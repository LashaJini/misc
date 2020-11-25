import Particles from "./string-to-particles/Particles";
import Playground from "./playground/Playground";

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
          path: "/projects/playground",
          component: Playground,
        },
      ]
    : [];

export const projectNames: Array<ProjectTypes> = [
  ...devProjects,
  {
    projectName: "To Particles",
    path: "/projects/to-particles",
    component: Particles,
  },
];

export { Particles, Playground };
