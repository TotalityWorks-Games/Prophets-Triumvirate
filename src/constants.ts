export const DIRECTION_DOWN = 'down';
export const DIRECTION_UP = 'up';
export const DIRECTION_LEFT = 'left';
export const DIRECTION_RIGHT = 'right';
export type Direction =
  | typeof DIRECTION_DOWN
  | typeof DIRECTION_UP
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT;
export enum SCENE_STATE {
  LOADING = 'SCENE_STATE__LOADING',
  READY = 'SCENE_STATE__READY',
  PLAYING = 'SCENE_STATE__PLAYING',
  TALKING = 'SCENE_STATE_TALKING',
  MENU = 'SCENE_STATE_MENU',
  PAUSED = 'SCENE_STATE__PAUSED',
  COMPLETED = 'SCENE_STATE__COMPLETED',
  GAMEOVER = 'SCENE_STATE__GAMEOVER',
  ERROR = 'SCENE_STATE__ERROR',
}
export type Dialogues = {
  actor: string;
  text: string;
}[];
