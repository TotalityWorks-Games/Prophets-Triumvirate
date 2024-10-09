import { Actor } from 'excalibur';
import { RACES } from '../../../constants';

export class Human extends Actor {
  race: RACES;
  constructor() {
    super();
    this.race = RACES.HUMAN;
  }
}
