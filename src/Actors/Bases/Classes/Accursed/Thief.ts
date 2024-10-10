import { ImageSource, Vector } from 'excalibur';
import { AbilityScores, CLASSES } from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedThief extends Accursed {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  inventory: [];
  constructor(
    pos: Vector,
    resource: ImageSource,
    level: number,
    scores: AbilityScores
  ) {
    super(pos, resource);
    this.class = CLASSES.THIEF;
    this.level = level;
    this.scores = scores;
    this.inventory = [];
  }

  public addToInventory(inventory: []) {
    this.inventory = inventory;
  }
}
