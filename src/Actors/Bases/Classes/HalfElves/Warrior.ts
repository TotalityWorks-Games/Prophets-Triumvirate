import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfWarrior extends HalfElf {
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
    this.class = CLASSES.WARRIOR;
    this.level = level;
    this.scores = scores;
  }
}
