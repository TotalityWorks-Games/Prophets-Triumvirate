import { AbilityScores, CLASSES } from '../../../../constants';
import { Nixforged } from '../../Races/Nixforged';

export class NixforgedWarrior extends Nixforged {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  inventory: [];
  constructor(level: number, scores: AbilityScores) {
    super();
    this.class = CLASSES.WARRIOR;
    this.level = level;
    this.scores = scores;
    this.inventory = [];
  }

  public addToInventory(inventory: []) {
    this.inventory = inventory;
  }
}
