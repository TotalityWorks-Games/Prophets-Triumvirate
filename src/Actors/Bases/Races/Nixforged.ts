import { ImageSource, Vector } from 'excalibur';
import { Direction, RACES, SEXES } from '../../../constants';
import { Character } from '../Character';

export class Nixforged extends Character {
  race: RACES;
  constructor(
    pos: Vector,
    resource: ImageSource,
    sex: SEXES,
    direction?: Direction
  ) {
    super(pos, resource, sex, direction);
    this.race = RACES.NIX_FORGED;
  }
}
