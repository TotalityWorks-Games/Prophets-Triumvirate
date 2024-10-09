import { CLASSES } from '../../../../constants';
import { Nixforged } from '../../Races/Nixforged';

export class NixforgedWarrior extends Nixforged {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WARRIOR;
  }
}
