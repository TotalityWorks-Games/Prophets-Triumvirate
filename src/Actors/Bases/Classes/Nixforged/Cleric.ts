import { CLASSES } from '../../../../constants';
import { Nixforged } from '../../Races/Nixforged';

export class NixforgedCleric extends Nixforged {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.CLERIC;
  }
}
