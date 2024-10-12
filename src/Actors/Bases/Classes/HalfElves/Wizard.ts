import { ImageSource, Vector } from 'excalibur';
import { AbilityScores, CLASSES, Direction } from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfWizard extends HalfElf {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  constructor(
    pos: Vector,
    resource: ImageSource,
    level: number,
    scores: AbilityScores,
    direction?: Direction
  ) {
    super(pos, resource, direction);
    this.class = CLASSES.WIZARD;
    this.level = level;
    this.scores = scores;
  }
}
