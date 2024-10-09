import { CLASSES } from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfWarrior extends HalfElf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WARRIOR;
  }
}
