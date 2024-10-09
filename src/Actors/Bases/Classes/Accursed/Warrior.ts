import { CLASSES } from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedWarrior extends Accursed {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WARRIOR;
  }
}
