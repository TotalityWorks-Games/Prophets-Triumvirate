import { CLASSES } from '../../../../constants';
import { Nixforged } from '../../Races/Nixforged';

export class NixforgedWizard extends Nixforged {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WIZARD;
  }
}
