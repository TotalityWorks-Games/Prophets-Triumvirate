import { CLASSES } from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanCleric extends Human {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.CLERIC;
  }
}
