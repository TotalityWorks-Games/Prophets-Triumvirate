import { AbilityScores, CLASSES } from '../../../../constants';
import { Nixforged } from '../../Races/Nixforged';

export class NixforgedCleric extends Nixforged {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  inventory: [];
  constructor(level: number, scores: AbilityScores) {
    super();
    this.class = CLASSES.CLERIC;
    this.level = level;
    this.scores = scores;
    this.inventory = [];
  }

  public addToInventory(inventory: []) {
    this.inventory = inventory;
  }
}
