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
  LOADING = 'SCENE_STATE_LOADING',
  READY = 'SCENE_STATE_READY',
  PLAYING = 'SCENE_STATE_PLAYING',
  TALKING = 'SCENE_STATE_TALKING',
  MENU = 'SCENE_STATE_MENU',
  PAUSED = 'SCENE_STATE_PAUSED',
  COMPLETED = 'SCENE_STATE_COMPLETED',
  GAMEOVER = 'SCENE_STATE_GAMEOVER',
  ERROR = 'SCENE_STATE_ERROR',
}
export type Dialogues = {
  actor: string;
  text: string;
}[];
export enum SEXES {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum RACES {
  ACCURSED = 'ACCURSED',
  ELF = 'ELF',
  HALF_ELF = 'HALF_ELF',
  HUMAN = 'HUMAN',
  NIX_FORGED = 'NIX_FORGED',
}
export enum CLASSES {
  CLERIC = 'CLERIC',
  THIEF = 'THIEF',
  WARRIOR = 'WARRIOR',
  WIZARD = 'WIZARD',
}
export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
};
