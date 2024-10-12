import { ImageSource, Vector } from 'excalibur';
import { Direction, RACES, SEXES } from '../../../constants';
import { Character } from '../Character';

export class HalfElf extends Character {
  race: RACES;
  constructor(
    name: string,
    pos: Vector,
    resource: ImageSource,
    sex: SEXES,
    direction?: Direction
  ) {
    super(name, pos, resource, sex, direction);
    this.race = RACES.HALF_ELF;
  }
}
