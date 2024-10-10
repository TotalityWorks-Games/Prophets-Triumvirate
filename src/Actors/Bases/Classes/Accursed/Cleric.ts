import { ImageSource, Vector } from 'excalibur';
import { AbilityScores, CLASSES, Direction } from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedCleric extends Accursed {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  inventory: string[];
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
    this.inventory = [];
  }

  public addToInventory(inventory: string[]) {
    this.inventory = inventory;
  }
}
