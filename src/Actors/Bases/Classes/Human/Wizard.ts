import { CLASSES } from '../../../../constants';
import { Human } from '../../Races/Human';

export class HumanWizard extends Human {
  class: CLASSES;
  constructor() {
    super();
    this.class = CLASSES.WIZARD;
  }
}
