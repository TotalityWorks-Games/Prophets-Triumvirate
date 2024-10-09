import { Actor } from 'excalibur';
import { RACES } from '../../../constants';

export class Nixforged extends Actor {
  race: RACES;
  constructor() {
    super();
    this.race = RACES.NIX_FORGED;
  }
}
