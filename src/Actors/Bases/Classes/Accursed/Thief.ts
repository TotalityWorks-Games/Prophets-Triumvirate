import { CLASSES } from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedThief extends Accursed {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.THIEF;
  }
}
