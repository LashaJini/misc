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

export interface IStats {
  text: string;
  font: string;
  px: number;
  particleRadius: number;
  particleColor: string;
}

const defaultStats: IStats = {
  text: "😈",
  /* text: "🐶", */
  /* text: "👻", */
  /* text: "👾", */
  /* text: "👽", */
  /* text: "😡", */
  font: "sans-serif",
  px: 80,
  particleRadius: 4.5,
  /* particleColor: "purple", */
  particleColor: "#631D5E",
};

export { defaultStats, CanvasStyle, getPixelRatio };
