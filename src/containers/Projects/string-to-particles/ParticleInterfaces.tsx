import { initialStatsState } from "../../../store/stats/reducers";

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

export { initialStatsState as defaultStats, CanvasStyle, getPixelRatio };

export type { CanvasStepType, IStats } from "../../../store/stats/types";
