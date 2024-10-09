import { Actor } from 'excalibur';
import { RACES } from '../../../constants';

export class Elf extends Actor {
  race: RACES;
  constructor() {
    super();
    this.race = RACES.ELF;
  }
}
