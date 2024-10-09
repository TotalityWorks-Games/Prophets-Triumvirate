import { CLASSES } from '../../../../constants';
import { Elf } from '../../Races/Elf';

export class ElvenWizard extends Elf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WIZARD;
  }
}
