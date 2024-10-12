import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { Elf } from '../../Races/Elf';

export class ElvenCleric extends Elf {
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
