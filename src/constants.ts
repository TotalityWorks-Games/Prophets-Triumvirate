export const DIRECTION_DOWN = 'down';
export const DIRECTION_UP = 'up';
export const DIRECTION_LEFT = 'left';
export const DIRECTION_RIGHT = 'right';
type Direction =
  | typeof DIRECTION_DOWN
  | typeof DIRECTION_UP
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT;
type CitizenType = 0 | 1 | 2 | 3;
