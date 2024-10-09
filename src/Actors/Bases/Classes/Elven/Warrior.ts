import { CLASSES } from '../../../../constants';
import { Elf } from '../../Races/Elf';

export class ElvenWarrior extends Elf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WARRIOR;
  }
}
