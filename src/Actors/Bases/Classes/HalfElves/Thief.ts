import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfThief extends HalfElf {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  constructor(
    name: string,
    pos: Vector,
    resource: ImageSource,
    level: number,
    scores: AbilityScores,
    sex: SEXES,
    direction?: Direction
  ) {
    super(name, pos, resource, sex, direction);
    this.class = CLASSES.THIEF;
    this.level = level;
    this.scores = scores;
  }
}
