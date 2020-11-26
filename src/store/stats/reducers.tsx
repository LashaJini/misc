import {
  RESET_STATS_TO_DEFAULTS,
  CHANGE_CANVAS_TEXTFIELD,
  CHANGE_CANVAS_TEXT_SIZE,
  CHANGE_PARTICLE_RADIUS,
  CHANGE_PARTICLE_COLOR,
  CHANGE_SCALE_BY_X,
  CHANGE_SCALE_BY_Y,
  CHANGE_STEP_ON_X,
  CHANGE_STEP_ON_Y,
  /* StatsType, */
  StatsActionType,
  IStats,
  /* ICanvasTextSize, */
  /* ICanvasTextField, */
} from "./types";

const textArray: Array<string> = ["😈", "22ci❤️", "😡"];
const colorArray: Array<string> = ["#631D5E", "#ff1500", "#036e20"];
const getRandomStats = () => {
  const randomIndex = Math.floor(Math.random() * textArray.length);

  const result = {
    canvasText: textArray[randomIndex],
    color: colorArray[randomIndex],
  };
  return result;
};

const randomStats = getRandomStats();

export const initialStatsState: IStats = {
  text: randomStats.canvasText,
  font: "sans-serif",
  px: 80,
  particleRadius: 4.5,
  particleColor: randomStats.color,
  scale: [5, 5],
  step: [2, 2],
};

export const statsReducer = (
  state = initialStatsState,
  action: StatsActionType
): IStats => {
  switch (action.type) {
    case RESET_STATS_TO_DEFAULTS:
      return { ...state, ...initialStatsState };
    case CHANGE_CANVAS_TEXTFIELD:
      return Object.assign({}, state, { text: action.payload });
    case CHANGE_CANVAS_TEXT_SIZE:
      return Object.assign({}, state, { px: action.payload });
    case CHANGE_PARTICLE_RADIUS:
      return Object.assign({}, state, { particleRadius: action.payload });
    case CHANGE_PARTICLE_COLOR:
      return Object.assign({}, state, { particleColor: action.payload });
    case CHANGE_SCALE_BY_X:
      return Object.assign({}, state, {
        scale: [action.payload, state.scale[1]],
      });
    case CHANGE_SCALE_BY_Y:
      return Object.assign({}, state, {
        scale: [state.scale[0], action.payload],
      });
    case CHANGE_STEP_ON_X:
      return Object.assign({}, state, {
        step: [action.payload, state.step[1]],
      });
    case CHANGE_STEP_ON_Y:
      return Object.assign({}, state, {
        step: [state.step[0], action.payload],
      });
    default:
      return state;
  }
};
