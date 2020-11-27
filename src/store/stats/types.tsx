export const CHANGE_CANVAS_TEXTFIELD = "CHANGE_CANVAS_TEXTFIELD";
export const CHANGE_CANVAS_TEXT_SIZE = "CHANGE_CANVAS_TEXT_SIZE";
export const CHANGE_PARTICLE_RADIUS = "CHANGE_PARTICLE_RADIUS";
export const CHANGE_PARTICLE_WIDTH = "CHANGE_PARTICLE_WIDTH";
export const CHANGE_PARTICLE_HEIGHT = "CHANGE_PARTICLE_HEIGHT";
export const CHANGE_PARTICLE_A = "CHANGE_PARTICLE_A";
export const CHANGE_PARTICLE_B = "CHANGE_PARTICLE_B";
export const CHANGE_PARTICLE_C = "CHANGE_PARTICLE_C";
export const CHANGE_PARTICLE_COLOR = "CHANGE_PARTICLE_COLOR";
export const CHANGE_SCALE_BY_X = "CHANGE_SCALE_BY_X";
export const CHANGE_SCALE_BY_Y = "CHANGE_SCALE_BY_Y";
export const CHANGE_STEP_ON_X = "CHANGE_STEP_ON_X";
export const CHANGE_STEP_ON_Y = "CHANGE_STEP_ON_Y";
export const CHANGE_PARTICLE_TYPE = "CHANGE_PARTICLE_TYPE";
export const CHANGE_PARTICLE_MOVEMENT = "CHANGE_PARTICLE_MOVEMENT";
export const RESET_STATS_TO_DEFAULTS = "RESET_STATS_TO_DEFAULTS";
export type StatsType =
  | typeof RESET_STATS_TO_DEFAULTS
  | typeof CHANGE_CANVAS_TEXTFIELD
  | typeof CHANGE_CANVAS_TEXT_SIZE
  | typeof CHANGE_PARTICLE_RADIUS
  | typeof CHANGE_PARTICLE_COLOR
  | typeof CHANGE_PARTICLE_WIDTH
  | typeof CHANGE_PARTICLE_HEIGHT
  | typeof CHANGE_PARTICLE_MOVEMENT
  | typeof CHANGE_PARTICLE_A
  | typeof CHANGE_PARTICLE_B
  | typeof CHANGE_PARTICLE_C
  | typeof CHANGE_SCALE_BY_X
  | typeof CHANGE_SCALE_BY_Y
  | typeof CHANGE_STEP_ON_X
  | typeof CHANGE_STEP_ON_Y;

export type CircularParticleType = "circle";
export type RectangularParticleType = "rect";
export type TriangularParticleType = "tri";

export type TowardsTheMouse = "toMouse";
export type AwayFromMouse = "fromMouse";

export type CanvasStepType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;
export type CanvasFontType = string;
export type CanvasTextFieldType = string;
export type CanvasTextSizeType = number | undefined;
export type ParticleRadiusType = number | undefined;
export type ParticleWidthType = number | undefined;
export type ParticleHeightType = number | undefined;
export type ParticleAType = number | undefined;
export type ParticleBType = number | undefined;
export type ParticleCType = number | undefined;
export type ParticleColorType = string;
export type CanvasScaleType = number | undefined;
export type MovementDirectionType = TowardsTheMouse | AwayFromMouse | undefined;
export type ParticleType =
  | CircularParticleType
  | RectangularParticleType
  | TriangularParticleType
  | undefined;

export interface IParticleMovement {
  canMove: boolean;
  direction: MovementDirectionType;
}

export interface IParticle {
  type: ParticleType;
  initialX: number;
  initialY: number;
  x: number;
  y: number;
  val: number;
  color: ParticleColorType;
  movementType: IParticleMovement;
  filled: boolean;
}
export interface ICircularParticle extends IParticle {
  radius: ParticleRadiusType;
}
export interface IRectangularParticle extends IParticle {
  w: ParticleWidthType;
  h: ParticleHeightType;
}
export interface ITriangularParticle extends IParticle {
  a: ParticleAType;
  b: ParticleBType;
  c: ParticleCType;
}
export type ParticleT =
  | IParticle
  | ICircularParticle
  | IRectangularParticle
  | ITriangularParticle;

export interface IStats {
  text: CanvasTextFieldType;
  font: CanvasFontType;
  px: CanvasTextSizeType;
  scale: [CanvasScaleType, CanvasScaleType];
  step: [CanvasStepType, CanvasStepType];
  particleType: ParticleType;
  particleT: ParticleT;
}

// actions

interface SetStatsAction {
  type: StatsType;
  payload: IStats;
}

interface SetCanvasTextAction {
  type: typeof CHANGE_CANVAS_TEXTFIELD;
  payload: CanvasTextFieldType;
}

interface SetCanvasTextSizeAction {
  type: typeof CHANGE_CANVAS_TEXT_SIZE;
  payload: CanvasTextSizeType;
}

interface SetParticleRadius {
  type: typeof CHANGE_PARTICLE_RADIUS;
  payload: ParticleRadiusType;
}

interface SetParticleWidth {
  type: typeof CHANGE_PARTICLE_WIDTH;
  payload: ParticleWidthType;
}

interface SetParticleHeight {
  type: typeof CHANGE_PARTICLE_HEIGHT;
  payload: ParticleHeightType;
}

interface SetParticleA {
  type: typeof CHANGE_PARTICLE_A;
  payload: ParticleAType;
}

interface SetParticleB {
  type: typeof CHANGE_PARTICLE_B;
  payload: ParticleBType;
}

interface SetParticleC {
  type: typeof CHANGE_PARTICLE_C;
  payload: ParticleCType;
}

interface SetParticleColor {
  type: typeof CHANGE_PARTICLE_COLOR;
  payload: ParticleColorType;
}

interface SetCanvasScaleX {
  type: typeof CHANGE_SCALE_BY_X;
  payload: CanvasScaleType;
}

interface SetCanvasScaleY {
  type: typeof CHANGE_SCALE_BY_Y;
  payload: CanvasScaleType;
}

interface SetCanvasStepX {
  type: typeof CHANGE_STEP_ON_X;
  payload: CanvasScaleType;
}

interface SetCanvasStepY {
  type: typeof CHANGE_STEP_ON_Y;
  payload: CanvasScaleType;
}

interface SetParticleType {
  type: typeof CHANGE_PARTICLE_TYPE;
  payload: ParticleType;
}

interface SetParticleMovementType {
  type: typeof CHANGE_PARTICLE_MOVEMENT;
  payload: IParticleMovement;
}

export type StatsActionType =
  | SetStatsAction
  | SetParticleMovementType
  | SetParticleType
  | SetParticleWidth
  | SetParticleA
  | SetParticleB
  | SetParticleC
  | SetParticleHeight
  | SetCanvasStepX
  | SetCanvasStepY
  | SetCanvasScaleX
  | SetCanvasScaleY
  | SetParticleRadius
  | SetParticleColor
  | SetCanvasTextAction
  | SetCanvasTextSizeAction;
