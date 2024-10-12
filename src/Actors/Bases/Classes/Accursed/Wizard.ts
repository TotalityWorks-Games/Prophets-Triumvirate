import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedWizard extends Accursed {
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
    this.class = CLASSES.WIZARD;
    this.level = level;
    this.scores = scores;
  }
}
