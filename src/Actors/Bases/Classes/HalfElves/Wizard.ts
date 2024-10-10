import { AbilityScores, CLASSES } from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfWizard extends HalfElf {
  class: CLASSES;
  scores: AbilityScores;
  level: number;
  inventory: [];
  constructor(level: number, scores: AbilityScores) {
    super();
    this.class = CLASSES.WIZARD;
    this.level = level;
    this.scores = scores;
    this.inventory = [];
  }

  public addToInventory(inventory: []) {
    this.inventory = inventory;
  }
}
