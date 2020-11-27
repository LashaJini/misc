import {
  initialStatsState,
  defaultParticle,
  defaultRectangularParticle,
  defaultCircularParticle,
  defaultTriangularParticle,
} from "../../../store/stats/reducers";

const CanvasStyle = {
  ctx: {
    backgroundColor: "black",
  },
};

const getPixelRatio = (context: any) => {
  let backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

export {
  initialStatsState as defaultStats,
  CanvasStyle,
  getPixelRatio,
  defaultParticle,
  defaultCircularParticle,
  defaultRectangularParticle,
  defaultTriangularParticle,
};

export type {
  CanvasStepType,
  IStats,
  ParticleType,
  CircularParticleType,
  RectangularParticleType,
  TriangularParticleType,
  IParticle,
  ICircularParticle,
  IRectangularParticle,
  ITriangularParticle,
} from "../../../store/stats/types";
