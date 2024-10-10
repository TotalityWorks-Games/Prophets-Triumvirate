import { AbilityScores, CLASSES } from '../../../../constants';
import { Elf } from '../../Races/Elf';

export class ElvenWizard extends Elf {
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
