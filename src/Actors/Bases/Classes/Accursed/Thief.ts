import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedThief extends Accursed {
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
    this.class = CLASSES.THIEF;
    this.level = level;
    this.scores = scores;
  }
}
