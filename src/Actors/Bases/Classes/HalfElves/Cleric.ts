import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfCleric extends HalfElf {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  constructor(
    pos: Vector,
    resource: ImageSource,
    level: number,
    scores: AbilityScores,
    sex: SEXES,
    direction?: Direction
  ) {
    super(pos, resource, sex, direction);
    this.class = CLASSES.CLERIC;
    this.level = level;
    this.scores = scores;
  }
}
