import { ImageSource, Vector } from 'excalibur';
import {
  AbilityScores,
  CLASSES,
  Direction,
  SEXES,
} from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanWizard extends Human {
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
    this.class = CLASSES.WIZARD;
    this.level = level;
    this.scores = scores;
  }
}
