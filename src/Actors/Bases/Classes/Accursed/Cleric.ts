import { CLASSES } from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedCleric extends Accursed {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.CLERIC;
  }
}
