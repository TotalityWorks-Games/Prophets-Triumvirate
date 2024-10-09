import { CLASSES } from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanThief extends Human {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.THIEF;
  }
}
