import { CLASSES } from '../../../../constants';
import { Accursed } from '../../Races/Accursed';

export class AccursedWizard extends Accursed {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WIZARD;
  }
}
