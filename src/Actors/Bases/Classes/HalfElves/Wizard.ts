import { CLASSES } from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfWizard extends HalfElf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WIZARD;
  }
}
