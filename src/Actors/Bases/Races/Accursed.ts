import { Actor } from 'excalibur';
import { RACES } from '../../../constants';

export class Accursed extends Actor {
  race: RACES;
  constructor() {
    super();
    this.race = RACES.ACCURSED;
  }
}
