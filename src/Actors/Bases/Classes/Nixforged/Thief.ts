import { CLASSES } from '../../../../constants';
import { Nixforged } from '../../Races/Nixforged';

export class NixforgedThief extends Nixforged {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.THIEF;
  }
}
