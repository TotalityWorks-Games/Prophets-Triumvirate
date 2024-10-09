import { Actor } from 'excalibur';
import { RACES } from '../../../constants';

export class HalfElf extends Actor {
  race: RACES;
  constructor() {
    super();
    this.race = RACES.HALF_ELF;
  }
}
