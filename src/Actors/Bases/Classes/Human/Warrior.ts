import { ImageSource, Vector } from 'excalibur';
import { AbilityScores, CLASSES, Direction } from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanWarrior extends Human {
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
    this.class = CLASSES.WARRIOR;
    this.level = level;
    this.scores = scores;
  }
}
