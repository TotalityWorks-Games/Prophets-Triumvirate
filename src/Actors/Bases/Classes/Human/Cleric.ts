import { ImageSource, Vector } from 'excalibur';
import { AbilityScores, CLASSES, Direction } from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanCleric extends Human {
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
    this.class = CLASSES.CLERIC;
    this.level = level;
    this.scores = scores;
  }
}
