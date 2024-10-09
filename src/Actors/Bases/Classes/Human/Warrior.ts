import { CLASSES } from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanWarrior extends Human {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WARRIOR;
  }
}
