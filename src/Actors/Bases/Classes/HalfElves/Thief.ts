import { CLASSES } from '../../../../constants';
import { HalfElf } from '../../Races/HalfElf';

export class HalfElfThief extends HalfElf {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.THIEF;
  }
}
