import { CLASSES } from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfCleric extends HalfElf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.CLERIC;
  }
}
