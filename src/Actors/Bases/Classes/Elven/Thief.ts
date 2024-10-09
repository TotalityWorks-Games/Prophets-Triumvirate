import { CLASSES } from '../../../../constants';
import { Elf } from '../../Races/Elf';

export class ElvenThief extends Elf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.THIEF;
  }
}
