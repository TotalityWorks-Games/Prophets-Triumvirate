import { ImageSource, Vector } from 'excalibur';
import { Direction, RACES } from '../../../constants';
import { Character } from '../Character';

export class Nixforged extends Character {
  race: RACES;
  constructor(pos: Vector, resource: ImageSource, direction?: Direction) {
    super(pos, resource, direction);
    this.race = RACES.NIX_FORGED;
  }
}
