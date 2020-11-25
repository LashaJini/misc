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

export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;

export interface IStats {
  text: string;
  font: string;
  px: number | undefined;
  particleRadius: number | undefined;
  particleColor: string;
  scale: [number | undefined, number | undefined];
  step: [StepType, StepType];
}

const textArray: Array<string> = ["😈", "22ci❤️", "😡"];
const colorArray: Array<string> = ["#631D5E", "#ff1500", "#036e20"];

const getRandomStats = () => {
  const randomIndex = Math.floor(Math.random() * textArray.length);

  const result = {
    text: textArray[randomIndex],
    color: colorArray[randomIndex],
  };
  return result;
};

const randomStats = getRandomStats();

const defaultStats: IStats = {
  text: randomStats.text,
  font: "sans-serif",
  px: 80,
  particleRadius: 4.5,
  particleColor: randomStats.color,
  scale: [5, 5],
  step: [2, 2],
};

export { defaultStats, CanvasStyle, getPixelRatio };
