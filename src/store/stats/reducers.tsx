import {
  RESET_STATS_TO_DEFAULTS,
  CHANGE_CANVAS_TEXTFIELD,
  CHANGE_PARTICLE_MOVEMENT,
  CHANGE_PARTICLE_WIDTH,
  CHANGE_PARTICLE_HEIGHT,
  CHANGE_PARTICLE_A,
  CHANGE_PARTICLE_B,
  CHANGE_PARTICLE_C,
  CHANGE_CANVAS_TEXT_SIZE,
  CHANGE_PARTICLE_RADIUS,
  CHANGE_PARTICLE_COLOR,
  CHANGE_SCALE_BY_X,
  CHANGE_SCALE_BY_Y,
  CHANGE_STEP_ON_X,
  CHANGE_STEP_ON_Y,
  CHANGE_PARTICLE_TYPE,
  StatsActionType,
  IStats,
  IParticle,
  IParticleMovement,
  ICircularParticle,
  IRectangularParticle,
  ITriangularParticle,
} from "./types";

const textArray: Array<string> = ["😈", "22ci❤️", "😡", "AC⚡DC"];
const pxArray: Array<number> = [80, 70, 80, 60];
const scaleArray: Array<[number, number]> = [
  [5, 5],
  [5, 5],
  [5, 5],
  [4, 4],
];
const colorArray: Array<string> = ["#631D5E", "#ff1500", "#036e20", "#c41310"];
const getRandomStats = () => {
  const randomIndex = Math.floor(Math.random() * textArray.length);

  const result = {
    canvasText: textArray[randomIndex],
    color: colorArray[randomIndex],
    px: pxArray[randomIndex],
    scale: scaleArray[randomIndex],
  };
  return result;
};

const randomStats = getRandomStats();
export const defaultParticleMovement: IParticleMovement = {
  canMove: false,
  direction: undefined,
};

export const defaultParticle: IParticle = {
  type: "circle",
  initialX: 0,
  initialY: 0,
  x: 0,
  y: 0,
  val: 0,
  color: randomStats.color,
  movementType: defaultParticleMovement,
  filled: true,
};
export const defaultCircularParticle: ICircularParticle = {
  ...defaultParticle,
  type: "circle",
  radius: 4.5,
};
export const defaultRectangularParticle: IRectangularParticle = {
  ...defaultParticle,
  type: "rect",
  w: 5,
  h: 6,
};
export const defaultTriangularParticle: ITriangularParticle = {
  ...defaultParticle,
  type: "tri",
  a: 5,
  b: 5,
  c: 5,
};

export const initialStatsState: IStats = {
  text: randomStats.canvasText,
  font: "sans-serif",
  px: randomStats.px,
  scale: randomStats.scale,
  step: [2, 2],
  particleType: "circle",
  particleT: defaultCircularParticle,
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
      return Object.assign({}, state, {
        particleT: { ...state.particleT, radius: action.payload },
      });
    case CHANGE_PARTICLE_WIDTH:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, w: action.payload },
      });
    case CHANGE_PARTICLE_HEIGHT:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, h: action.payload },
      });
    case CHANGE_PARTICLE_A:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, a: action.payload },
      });
    case CHANGE_PARTICLE_B:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, b: action.payload },
      });
    case CHANGE_PARTICLE_C:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, c: action.payload },
      });
    case CHANGE_PARTICLE_COLOR:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, color: action.payload },
      });
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
    case CHANGE_PARTICLE_TYPE:
      return Object.assign({}, state, {
        particleType: action.payload,
      });
    case CHANGE_PARTICLE_MOVEMENT:
      return Object.assign({}, state, {
        particleT: { ...state.particleT, movementType: action.payload },
      });
    default:
      return state;
  }
};
